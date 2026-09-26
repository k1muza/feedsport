# Brazilian swine nutrient importer

This importer enriches the existing FeedSport ingredient catalogue with swine-specific nutrient data from the **Brazilian Tables for Poultry and Swine, 5th edition**.

It intentionally keeps `src/data/ingredients.json` as the canonical ingredient catalogue. Brazilian rows are matched to existing FeedSport ingredients by an explicit alias first, then by an exact normalized name. It does **not** fuzzy-match ingredient names because a plausible-looking match can represent a materially different feedstuff.

## What it imports

From Table 1.01 it imports swine digestibility, DE/ME/NE, sow DE/ME/NE, standardized digestible phosphorus, and swine SID amino-acid values and coefficients. From Table 1.09 it calculates SID concentrations for FeedSport's crystalline amino acids using the existing total amino-acid concentration multiplied by the Brazilian standardized digestibility coefficient. From Table 1.10 it imports swine digestible phosphorus for mineral sources where the FeedSport ingredient identity is unambiguous.

Missing table cells stay missing. They are never converted to zero.

## Run it

The PDF is not committed to this repository. Install Poppler so `pdftotext` is available, then run:

```bash
npm run data:import-brazilian-swine -- --pdf /path/to/tabela_inglescompress.pdf --report /tmp/brazilian-swine-report.json
```

To inspect the match/import report without modifying JSON files:

```bash
npm run data:import-brazilian-swine -- --pdf /path/to/tabela_inglescompress.pdf --dry-run --report /tmp/brazilian-swine-report.json
```

If the PDF has already been converted with `pdftotext -layout`, pass the text instead:

```bash
npm run data:import-brazilian-swine -- --text /path/to/brazilian-tables.txt --dry-run
```

The command is idempotent: imported compositions are upserted by nutrient ID, so rerunning it replaces the same source-specific values rather than duplicating them.

## Ingredient matching

`scripts/brazilian-swine/ingredient-aliases.json` contains reviewed mappings for cases where the Brazilian and FeedSport names differ. A `null` value explicitly skips a source row. Any row that has neither an alias nor one exact normalized FeedSport match is reported as unmatched rather than guessed.

Review the report before adding aliases. Prefer composition/processing equivalence over name similarity.
