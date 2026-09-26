#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const importer = path.join(root, 'scripts/import-brazilian-swine.mjs');
const sourceDir = path.join(root, 'scripts/brazilian-swine/source-data');
const aliasesPath = path.join(root, 'scripts/brazilian-swine/ingredient-aliases.json');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'feedsport-brazilian-swine-'));
const ingredientsPath = path.join(tempDir, 'ingredients.json');
const nutrientsPath = path.join(tempDir, 'nutrients.json');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function runImporter() {
  const result = spawnSync(process.execPath, [
    importer,
    '--ingredients', ingredientsPath,
    '--nutrients', nutrientsPath,
    '--aliases', aliasesPath,
    '--source-dir', sourceDir,
  ], { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });

  if (result.status !== 0) {
    throw new Error([
      'Importer failed.',
      result.stdout,
      result.stderr,
    ].filter(Boolean).join('\n'));
  }
}

try {
  const originalIngredients = JSON.parse(fs.readFileSync(path.join(root, 'src/data/ingredients.json'), 'utf8'));
  const originalNutrients = fs.readFileSync(path.join(root, 'src/data/nutrients.json'), 'utf8');
  const maize = originalIngredients.find((ingredient) => ingredient.id === 'maize');
  assert(maize, 'Regression fixture requires the maize ingredient.');

  // A value for the same nutrient from another source must survive a Brazilian
  // import. This catches the old nutrient-ID-only upsert behaviour.
  maize.compositions.push({
    nutrientId: 'swine-me-kcal',
    value: 9999,
    table: 'Regression fixture source',
    basis: 'as-fed',
  });

  // Deliberately use CRLF so the test also protects line-ending preservation.
  fs.writeFileSync(
    ingredientsPath,
    (JSON.stringify(originalIngredients, null, 4) + '\n').replace(/\n/g, '\r\n'),
  );
  fs.writeFileSync(
    nutrientsPath,
    originalNutrients.replace(/\r?\n/g, '\r\n'),
  );

  // Run twice to verify idempotence as well as a normal Poppler-free import.
  runImporter();
  runImporter();

  const rawIngredients = fs.readFileSync(ingredientsPath, 'utf8');
  assert(rawIngredients.includes('\r\n'), 'Importer did not preserve CRLF line endings.');
  assert(!rawIngredients.replace(/\r\n/g, '').includes('\n'), 'Importer introduced bare LF line endings.');

  const ingredients = JSON.parse(rawIngredients);
  const findIngredient = (id) => {
    const ingredient = ingredients.find((item) => item.id === id);
    assert(ingredient, 'Missing expected ingredient: ' + id);
    return ingredient;
  };
  const valuesFor = (ingredient, nutrientId) =>
    ingredient.compositions.filter((composition) => String(composition.nutrientId) === nutrientId);

  const importedMaize = findIngredient('maize');
  const maizeMe = valuesFor(importedMaize, 'swine-me-kcal');
  const brazilianMaizeMe = maizeMe.filter((composition) => composition.table === 'Brazilian Tables 5th ed. Table 1.01');
  const fixtureMaizeMe = maizeMe.filter((composition) => composition.table === 'Regression fixture source');

  assert(brazilianMaizeMe.length === 1, 'Brazilian maize ME duplicated after rerun.');
  assert(brazilianMaizeMe[0].value === 3360, 'Brazilian maize ME should be 3360 kcal/kg.');
  assert(fixtureMaizeMe.length === 1 && fixtureMaizeMe[0].value === 9999, 'Importer overwrote another source value.');

  const gluten = findIngredient('corn-gluten-meal');
  const glutenDe = valuesFor(gluten, 'swine-de-kcal')
    .find((composition) => composition.table === 'Brazilian Tables 5th ed. Table 1.01');
  assert(glutenDe?.value === 4341, 'Corn gluten meal swine DE should be 4341 kcal/kg.');

  const cotton = findIngredient('cottonseed-meal-oil-5-crude-fibre-15');
  const cottonDe = valuesFor(cotton, 'swine-de-kcal')
    .find((composition) => composition.table === 'Brazilian Tables 5th ed. Table 1.01');
  assert(cottonDe?.value === 2877, 'Cottonseed meal 43% CP swine DE should be 2877 kcal/kg.');

  console.log('Brazilian swine importer regression checks passed.');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
