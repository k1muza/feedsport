# Brazilian swine nutrient importer

This importer enriches the existing FeedSport ingredient catalogue with swine-specific nutrient data from the **Brazilian Tables for Poultry and Swine, 5th edition**.

It keeps `src/data/ingredients.json` as the canonical ingredient catalogue. Brazilian rows are matched to existing FeedSport ingredients by an explicit reviewed alias first, then by one exact normalized name. It deliberately does **not** fuzzy-match ingredient names because a plausible-looking match can represent a materially different feedstuff.

## What it imports

From Table 1.01 it imports swine digestibility, DE/ME/NE, sow DE/ME/NE, standardized digestible phosphorus, and swine SID amino-acid concentrations and coefficients. From Table 1.09 it calculates SID concentrations for FeedSport's crystalline amino acids using the existing total amino-acid concentration multiplied by the Brazilian standardized digestibility coefficient. From Table 1.10 it imports swine digestible phosphorus for mineral sources where the FeedSport ingredient identity is unambiguous.

Missing source cells remain missing. They are never converted to zero.

## Normal import

The normalized source tables are committed under `scripts/brazilian-swine/source-data/`, so the normal import has no Poppler or PDF dependency:

```bash
npm run data:import-brazilian-swine -- --dry-run --report /tmp/brazilian-swine-report.json
npm run data:import-brazilian-swine -- --report /tmp/brazilian-swine-report.json
```

The importer preserves the existing JSON line-ending style and replaces only a composition with the same nutrient ID **and the same source table**. Values from other reference sources are left intact.

## Refresh source data from the PDF

Refreshing the committed source snapshot is a separate maintenance operation. If `pdftotext` is available:

```bash
npm run data:import-brazilian-swine -- \
  --pdf /path/to/tabela_inglescompress.pdf \
  --write-source-dir scripts/brazilian-swine/source-data \
  --dry-run
```

If the PDF has already been converted with `pdftotext -layout`, Poppler is not needed by the importer:

```bash
npm run data:import-brazilian-swine -- \
  --text /path/to/brazilian-tables.txt \
  --write-source-dir scripts/brazilian-swine/source-data \
  --dry-run
```

After reviewing the generated source-data diff, run the normal import to update `ingredients.json` and `nutrients.json`.

## Regression checks

Run the importer regression checks with:

```bash
npm run data:test-brazilian-swine
```

The checks cover Poppler-free imports from the committed snapshot, idempotent reruns, source-specific upserts, line-ending preservation, and representative energy values from variable-width PDF rows.

## Ingredient matching

`scripts/brazilian-swine/ingredient-aliases.json` contains reviewed mappings for cases where the Brazilian and FeedSport names differ. A `null` value explicitly skips a source row. Any row that has neither an alias nor one exact normalized FeedSport match is reported as unmatched rather than guessed.

Review the report before adding aliases. Prefer composition and processing equivalence over name similarity.
