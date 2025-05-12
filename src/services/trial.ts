import solver from 'javascript-lp-solver';

const model = {
  optimize: 'cost',
  opType: 'min',
  constraints: {
    protein: { min: 18 },
    fat:     { min: 5 },
    fiber:   { min: 8 },
    total:   { equal: 100 }
  },
  variables: {
    ingA: { cost: 0.2, protein: 38, fat: 3.8, fiber: 11.1, total: 1 },
    ingB: { cost: 0.15, protein: 22, fat: 34, fiber: 6.5, total: 1 },
    // …etc…
  }
};

const results = solver.Solve(model);
console.log(results);
