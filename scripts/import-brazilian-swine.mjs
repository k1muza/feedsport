#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const SOURCE_101 = 'Brazilian Tables 5th ed. Table 1.01';
const SOURCE_109 = 'Brazilian Tables 5th ed. Table 1.09';
const SOURCE_110 = 'Brazilian Tables 5th ed. Table 1.10';

const AA_SPECS = [
  { slug: 'lysine', label: 'Lysine, %', display: 'Lysine', totalNutrientId: '17' },
  { slug: 'methionine', label: 'Methionine, %', display: 'Methionine', totalNutrientId: '19' },
  { slug: 'methionine-plus-cystine', label: 'Met + Cys, %', display: 'Methionine + cystine', totalNutrientId: '21' },
  { slug: 'threonine', label: 'Threonine, %', display: 'Threonine', totalNutrientId: '23' },
  { slug: 'tryptophan', label: 'Tryptophan, %', display: 'Tryptophan', totalNutrientId: '25' },
  { slug: 'arginine', label: 'Arginine, %', display: 'Arginine', totalNutrientId: '27' },
  { slug: 'isoleucine', label: 'Isoleucine, %', display: 'Isoleucine', totalNutrientId: '29' },
  { slug: 'valine', label: 'Valine, %', display: 'Valine', totalNutrientId: '31' },
  { slug: 'leucine', label: 'Leucine, %', display: 'Leucine', totalNutrientId: '51' },
  { slug: 'histidine', label: 'Histidine, %', display: 'Histidine', totalNutrientId: '98' },
  { slug: 'phenylalanine', label: 'Phenylalanine, %', display: 'Phenylalanine', totalNutrientId: '95' },
  { slug: 'phenylalanine-plus-tyrosine', label: 'Phe + Tyr, %', display: 'Phenylalanine + tyrosine', totalNutrientId: '97' },
];

const MAIN_NUTRIENT_DEFS = [
  ['swine-dig-coef-om', 'Organic matter, digestibility coefficient, swine', '%', 'main'],
  ['swine-digestible-om', 'Digestible organic matter, swine', '%', 'main'],
  ['swine-undigestible-om', 'Undigestible organic matter, swine', '%', 'main'],
  ['swine-dig-coef-cf', 'Crude fibre, digestibility coefficient, swine', '%', 'main'],
  ['swine-dig-coef-ndf', 'NDF, digestibility coefficient, swine', '%', 'main'],
  ['swine-dig-coef-adf', 'ADF, digestibility coefficient, swine', '%', 'main'],
  ['swine-dig-coef-ee', 'Ether extract, digestibility coefficient, swine', '%', 'main'],
  ['swine-digestible-ee', 'Digestible ether extract, swine', '%', 'main'],
  ['swine-de-kcal', 'Digestible Energy (DE), swine', 'kcal/kg', 'energy'],
  ['swine-me-kcal', 'Metabolizable Energy (ME), swine', 'kcal/kg', 'energy'],
  ['swine-ne-kcal', 'Net Energy (NE), swine', 'kcal/kg', 'energy'],
  ['sow-de-kcal', 'Digestible Energy (DE), sows', 'kcal/kg', 'energy'],
  ['sow-me-kcal', 'Metabolizable Energy (ME), sows', 'kcal/kg', 'energy'],
  ['sow-ne-kcal', 'Net Energy (NE), sows', 'kcal/kg', 'energy'],
  ['swine-dig-coef-p', 'Phosphorus, digestibility coefficient, swine', '%', 'minerals'],
  ['swine-digestible-p', 'Digestible phosphorus, swine', '%', 'minerals'],
  ['swine-std-digestible-p', 'Standardized digestible phosphorus, swine', '%', 'minerals'],
];

const NUTRIENT_DEFS = [
  ...MAIN_NUTRIENT_DEFS.map(([id, name, unit, categoryId]) => ({ id, name, unit, categoryId, description: '' })),
  ...AA_SPECS.flatMap(({ slug, display }) => [
    { id: 'swine-sid-' + slug, name: display + ', ileal standardized, swine', unit: '%', categoryId: 'amino-acids', description: 'Standardized ileal digestible concentration for swine.' },
    { id: 'swine-sid-coef-' + slug, name: display + ', standardized ileal digestibility coefficient, swine', unit: '%', categoryId: 'amino-acids', description: 'Standardized ileal digestibility coefficient for swine.' },
  ]),
];

const MAIN_FIELDS = [
  ['swine-dig-coef-om', 'Coef. Dig. OM Swine'],
  ['swine-digestible-om', 'Digestible OM Swine'],
  ['swine-undigestible-om', 'Undig. OM Pigs'],
  ['swine-dig-coef-cf', 'Coef. Dig. CF Swine'],
  ['swine-dig-coef-ndf', 'Coef. Dig. NDF Swine'],
  ['swine-dig-coef-adf', 'Coef. Dig. ADF Swine'],
  ['swine-dig-coef-ee', 'Coef. Dig. EE Swine'],
  ['swine-digestible-ee', 'Digestible EE Swine'],
  ['swine-dig-coef-p', 'Coef. Dig. P Swine'],
  ['swine-std-digestible-p', 'Std. Dig. P Swine'],
];

const MINERAL_SOURCE_MAP = {
  'Monocalcium Phosph.': 'monocalcium-phosphate',
  'Monodical. Phosph.': 'monodicalcium-phosphate',
};

const CRYSTALLINE_MAP = {
  'Lysine - HCl': { ingredientId: 'l-lysine-hcl', aaSlug: 'lysine', totalNutrientId: '17' },
  'Methionine': { ingredientId: 'dl-methionine', aaSlug: 'methionine', totalNutrientId: '19', additionalSidSlugs: ['methionine-plus-cystine'] },
  'Threonine': { ingredientId: 'l-threonine', aaSlug: 'threonine', totalNutrientId: '23' },
  'Tryptophan': { ingredientId: 'l-tryptophan', aaSlug: 'tryptophan', totalNutrientId: '25' },
  'Valine': { ingredientId: 'l-valine', aaSlug: 'valine', totalNutrientId: '31' },
  'Isoleucine': { ingredientId: 'l-isoleucine', aaSlug: 'isoleucine', totalNutrientId: '29' },
  'Arginine': { ingredientId: 'l-arginine', aaSlug: 'arginine', totalNutrientId: '27' },
};

function normalizeName(value) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[’']/g, '')
    .replace(/#/g, '')
    .replace(/\bby[- ]?products?\b/g, 'byproduct')
    .replace(/[^a-z0-9%+<>.-]+/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

function parseNumber(token) {
  if (!token || token === '-') return null;
  const value = Number(token.replace('*', ''));
  return Number.isFinite(value) ? value : null;
}

function valueAfter(block, label) {
  const escaped = label.replace(/[.*+?^$()|[\]{}\\]/g, '\\$&');
  const match = block.match(new RegExp(escaped + '\\s+(-|\\d+(?:\\.\\d+)?)', 'm'));
  return match ? parseNumber(match[1]) : null;
}

function parseEnergy(block) {
  const lines = block.split(/\r?\n/);
  const start = lines.findIndex((line) => line.includes('Energy (kcal/kg)'));
  if (start < 0) return {};
  const endRelative = lines.slice(start + 1).findIndex((line) => line.trim() === 'Minerals');
  const end = endRelative < 0 ? lines.length : start + 1 + endRelative;
  let group = null;
  const out = {};
  for (const line of lines.slice(start + 1, end)) {
    const right = line.length > 47 ? line.slice(47).trim() : '';
    if (right === 'Swine') { group = 'swine'; continue; }
    if (right === 'Sows') { group = 'sows'; continue; }
    if (!group || !right) continue;
    const match = right.match(/^(Digestible Energy|Energy Dig\.|Metabolizable Energy|Energy Met\.|Net Energy)\s+(-|\d+(?:\.\d+)?)/);
    if (!match) continue;
    const label = match[1];
    const value = parseNumber(match[2]);
    if (value === null) continue;
    const kind = /Digestible|Energy Dig/.test(label) ? 'de' : /Metabolizable|Energy Met/.test(label) ? 'me' : 'ne';
    out[(group === 'swine' ? 'swine' : 'sow') + '-' + kind + '-kcal'] = value;
  }
  return out;
}

function parseAminoAcids(block) {
  const out = {};
  for (const spec of AA_SPECS) {
    const escaped = spec.label.replace(/[.*+?^$()|[\]{}\\]/g, '\\$&');
    const match = block.match(new RegExp('^\\s*' + escaped + '\\s+(.+?)\\s*$', 'm'));
    if (!match) continue;
    const values = match[1].match(/-|\d+(?:\.\d+)?\*?/g) ?? [];
    if (values.length < 6) continue;
    const sid = parseNumber(values[4]);
    const coefficient = parseNumber(values[5]);
    if (sid !== null) out['swine-sid-' + spec.slug] = sid;
    if (coefficient !== null) out['swine-sid-coef-' + spec.slug] = coefficient;
  }
  return out;
}

function parseTable101(text) {
  const start = text.indexOf('Table 1.01 - Chemical Composition');
  const end = text.indexOf('Table 1.02 - Equations', start);
  if (start < 0 || end < 0) throw new Error('Could not locate Table 1.01 boundaries.');
  const chapter = text.slice(start, end);
  const heading = /Table 1\.01 - Chemical Composition, Digestibility, and Energy\s*\n\s*Values of Poultry and Swine Feedstuffs \(as-fed\) cont\.\s*\n\s*\n([^\n]+)/g;
  const matches = [...chapter.matchAll(heading)];
  if (matches.length % 2 !== 0) throw new Error('Expected an even number of Table 1.01 pages, found ' + matches.length + '.');
  const blocks = matches.map((match, index) => ({
    name: match[1].trim(),
    body: chapter.slice(match.index + match[0].length, index + 1 < matches.length ? matches[index + 1].index : chapter.length),
  }));
  const records = [];
  for (let i = 0; i < blocks.length; i += 2) {
    const pair = [blocks[i], blocks[i + 1]];
    const main = pair.find((x) => /Main Components \(%\)|Principais Componentes \(%\)/.test(x.body));
    const amino = pair.find((x) => x.body.includes('Amino Acid Content and Digestibility'));
    if (!main || !amino) {
      records.push({ name: pair[0].name, nutrients: {}, warning: 'Could not identify both main and amino-acid pages.' });
      continue;
    }
    const nutrients = {};
    for (const [id, label] of MAIN_FIELDS) {
      const value = valueAfter(main.body, label);
      if (value !== null) nutrients[id] = value;
    }
    Object.assign(nutrients, parseEnergy(main.body), parseAminoAcids(amino.body));
    records.push({ name: main.name, nutrients });
  }
  return records;
}

function parseTable109(text) {
  const start = text.indexOf('Table 1.09 - Composition, Digestibility, and Energy Values of');
  const end = text.indexOf('Table 1.10 - Inorganic Mineral Sources', start);
  if (start < 0 || end < 0) throw new Error('Could not locate Table 1.09 boundaries.');
  const block = text.slice(start, end);
  const rowNames = ['Alanine','Asparagine','Aspartic Ac.','Arginine','Cystine','Phenylalan.','Glycine','Glutamic Ac.','Glutamine','Histidine','Isoleucine','Leucine','Lysine','Lysine - HCl','Methionine','Proline','Tyrosine','Threonine','Tryptophan','Serine','Valine'];
  const rows = {};
  for (const name of rowNames) {
    const escaped = name.replace(/[.*+?^$()|[\]{}\\]/g, '\\$&');
    const match = block.match(new RegExp('^\\s*' + escaped + '\\s+(.+?)\\s*$', 'm'));
    if (!match) continue;
    const nums = match[1].match(/\d+(?:\.\d+)?/g)?.map(Number) ?? [];
    if (nums.length < 7) continue;
    rows[name] = {
      nitrogen: nums[0], crudeProtein: nums[1], standardizedDigestibility: nums[2],
      grossEnergy: nums[3], digestibleEnergy: nums[4], standardizedMetabolizableEnergy: nums[5], netEnergy: nums[6],
    };
  }
  return rows;
}

function parseTable110(text) {
  const start = text.indexOf('Table 1.10 - Inorganic Mineral Sources for Poultry and Swine (as-fed)');
  const end = text.indexOf('Table 1.11 - Mineral Content of Brazilian Phosphates', start);
  if (start < 0 || end < 0) throw new Error('Could not locate Table 1.10 boundaries.');
  const block = text.slice(start, end);
  const rows = {};
  const phosphorusEnd = block.indexOf('Calcium Sources');
  const phosphorusBlock = phosphorusEnd >= 0 ? block.slice(0, phosphorusEnd) : block;
  for (const [sourceName] of Object.entries(MINERAL_SOURCE_MAP)) {
    const escaped = sourceName.replace(/[.*+?^$()|[\]{}\\]/g, '\\$&');
    const match = phosphorusBlock.match(new RegExp('^' + escaped + '.*$', 'm'));
    if (!match) continue;
    const nums = match[0].slice(78).match(/\d+(?:\.\d+)?/g)?.map(Number) ?? [];
    if (nums.length >= 2) rows[sourceName] = { digestiblePhosphorus: nums[0], digestibilityCoefficient: nums[1] };
  }
  return rows;
}

function getPdfText(pdfPath) {
  const result = spawnSync('pdftotext', ['-layout', pdfPath, '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (result.error?.code === 'ENOENT') throw new Error('pdftotext is required. Install Poppler (poppler-utils) or supply --text <extracted.txt>.');
  if (result.status !== 0) throw new Error('pdftotext failed: ' + (result.stderr || ('exit ' + result.status)));
  return result.stdout;
}

function upsertComposition(ingredient, nutrientId, value, table, basis = 'as-fed') {
  ingredient.compositions ??= [];
  ingredient.compositions = ingredient.compositions.filter((c) => String(c.nutrientId) !== nutrientId);
  ingredient.compositions.push({ nutrientId, value: Number(value.toFixed(4)), table, basis });
}

function ensureNutrients(nutrients) {
  const byId = new Map(nutrients.map((n) => [String(n.id), n]));
  for (const def of NUTRIENT_DEFS) if (!byId.has(def.id)) nutrients.push(def);
}

function readArgs(argv) {
  const args = { dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--dry-run') args.dryRun = true;
    else if (arg.startsWith('--')) args[arg.slice(2)] = argv[++i];
  }
  return args;
}

function main() {
  const args = readArgs(process.argv.slice(2));
  const root = process.cwd();
  const ingredientsPath = path.resolve(root, args.ingredients ?? 'src/data/ingredients.json');
  const nutrientsPath = path.resolve(root, args.nutrients ?? 'src/data/nutrients.json');
  const aliasesPath = path.resolve(root, args.aliases ?? 'scripts/brazilian-swine/ingredient-aliases.json');
  if (!args.pdf && !args.text) throw new Error('Usage: npm run data:import-brazilian-swine -- --pdf /path/to/tabela_inglescompress.pdf [--dry-run]');
  const text = args.text ? fs.readFileSync(path.resolve(root, args.text), 'utf8') : getPdfText(path.resolve(root, args.pdf));
  const ingredients = JSON.parse(fs.readFileSync(ingredientsPath, 'utf8'));
  const nutrients = JSON.parse(fs.readFileSync(nutrientsPath, 'utf8'));
  const aliases = JSON.parse(fs.readFileSync(aliasesPath, 'utf8'));
  ensureNutrients(nutrients);

  const table101 = parseTable101(text);
  const table109 = parseTable109(text);
  const table110 = parseTable110(text);
  if (table101.length !== 102) throw new Error('Table 1.01 parser expected 102 feedstuffs, found ' + table101.length + '.');
  if (Object.keys(table109).length < 20) throw new Error('Table 1.09 parser expected at least 20 amino acids, found ' + Object.keys(table109).length + '.');

  const ingredientById = new Map(ingredients.map((x) => [x.id, x]));
  const exactByName = new Map();
  for (const ingredient of ingredients) {
    const key = normalizeName(ingredient.name);
    const current = exactByName.get(key) ?? [];
    current.push(ingredient.id);
    exactByName.set(key, current);
  }

  const report = { sourceFeedstuffs: table101.length, matched: [], unmatched: [], skipped: [], crystalline: [], mineralSources: [], valuesImported: 0 };
  const usedTargets = new Map();
  for (const row of table101) {
    let targetId = Object.prototype.hasOwnProperty.call(aliases, row.name) ? aliases[row.name] : undefined;
    if (targetId === null) { report.skipped.push(row.name); continue; }
    if (!targetId) {
      const exact = exactByName.get(normalizeName(row.name)) ?? [];
      if (exact.length === 1) targetId = exact[0];
    }
    if (!targetId || !ingredientById.has(targetId)) { report.unmatched.push(row.name); continue; }
    if (usedTargets.has(targetId)) throw new Error('Multiple Brazilian Table 1.01 rows map to ' + targetId + ': ' + usedTargets.get(targetId) + ' and ' + row.name);
    usedTargets.set(targetId, row.name);
    const ingredient = ingredientById.get(targetId);
    let count = 0;
    for (const [nutrientId, value] of Object.entries(row.nutrients)) {
      upsertComposition(ingredient, nutrientId, value, SOURCE_101, 'as-fed');
      count++;
    }
    report.valuesImported += count;
    report.matched.push({ source: row.name, ingredientId: targetId, values: count });
  }

  for (const [sourceName, ingredientId] of Object.entries(MINERAL_SOURCE_MAP)) {
    const source = table110[sourceName];
    const ingredient = ingredientById.get(ingredientId);
    if (!source || !ingredient) continue;
    upsertComposition(ingredient, 'swine-digestible-p', source.digestiblePhosphorus, SOURCE_110, 'as-fed');
    upsertComposition(ingredient, 'swine-dig-coef-p', source.digestibilityCoefficient, SOURCE_110, 'digestibility-coefficient');
    report.valuesImported += 2;
    report.mineralSources.push({ source: sourceName, ingredientId, ...source });
  }

  for (const [rowName, mapping] of Object.entries(CRYSTALLINE_MAP)) {
    const source = table109[rowName];
    const ingredient = ingredientById.get(mapping.ingredientId);
    if (!source || !ingredient) continue;
    const total = ingredient.compositions.find((c) => String(c.nutrientId) === mapping.totalNutrientId)?.value;
    if (!Number.isFinite(total)) continue;
    const sid = total * source.standardizedDigestibility / 100;
    upsertComposition(ingredient, 'swine-sid-' + mapping.aaSlug, sid, SOURCE_109 + ' (calculated from total amino acid × standardized digestibility)', 'as-fed');
    upsertComposition(ingredient, 'swine-sid-coef-' + mapping.aaSlug, source.standardizedDigestibility, SOURCE_109, 'digestibility-coefficient');
    for (const extra of mapping.additionalSidSlugs ?? []) {
      upsertComposition(ingredient, 'swine-sid-' + extra, sid, SOURCE_109 + ' (calculated from total amino acid × standardized digestibility)', 'as-fed');
      upsertComposition(ingredient, 'swine-sid-coef-' + extra, source.standardizedDigestibility, SOURCE_109, 'digestibility-coefficient');
    }
    report.valuesImported += 2 + 2 * (mapping.additionalSidSlugs?.length ?? 0);
    report.crystalline.push({ source: rowName, ingredientId: mapping.ingredientId, standardizedDigestibility: source.standardizedDigestibility, totalAminoAcid: total, calculatedSid: Number(sid.toFixed(4)) });
  }

  const maize = report.matched.find((x) => x.source === 'Corn, Grain (Average)');
  if (!maize) throw new Error('Validation failed: Corn, Grain (Average) was not mapped.');
  const maizeIngredient = ingredientById.get(maize.ingredientId);
  if (!maizeIngredient.compositions.some((c) => String(c.nutrientId) === 'swine-me-kcal' && c.value > 3000)) throw new Error('Validation failed: maize swine ME was not imported correctly.');
  if (!maizeIngredient.compositions.some((c) => String(c.nutrientId) === 'swine-sid-lysine' && c.value > 0)) throw new Error('Validation failed: maize SID lysine was not imported correctly.');

  if (!args.dryRun) {
    fs.writeFileSync(ingredientsPath, JSON.stringify(ingredients, null, 4) + '\n');
    fs.writeFileSync(nutrientsPath, JSON.stringify(nutrients, null, 2) + '\n');
  }
  if (args.report) fs.writeFileSync(path.resolve(root, args.report), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({
    sourceFeedstuffs: report.sourceFeedstuffs,
    matchedFeedstuffs: report.matched.length,
    unmatchedFeedstuffs: report.unmatched.length,
    skippedFeedstuffs: report.skipped.length,
    crystallineAminoAcids: report.crystalline.length,
    mineralSources: report.mineralSources.length,
    valuesImported: report.valuesImported,
    unmatched: report.unmatched,
  }, null, 2));
}

try { main(); } catch (error) { console.error(error instanceof Error ? error.message : error); process.exit(1); }
