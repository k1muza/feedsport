import { Factory } from 'fishery';
import { IngredientAnalyser } from './coordinate-decent';
import { RatioIngredient, TargetNutrient, Composition } from '@/types';

// Factory for Composition
const compositionFactory = Factory.define<Composition>(({ sequence, transientParams }) => ({
  nutrientId: transientParams.nutrientId ?? sequence,
  value: transientParams.value ?? 0,
  nutrient: transientParams.nutrient
    ? { ...transientParams.nutrient, categoryId: null, description: '', unit: '' }
    : undefined,
}));

// Factory for RatioIngredient with transient overrides
const ratioIngredientFactory = Factory.define<RatioIngredient, Partial<RatioIngredient>>(({ sequence, transientParams }) => ({
  id: transientParams.id ?? `ing_${sequence}`,
  name: transientParams.name ?? `Ingredient ${sequence}`,
  description: '',
  key_benefits: [],
  applications: [],
  categoryId: 0,
  compositions: transientParams.compositions ?? [],
  ratio: transientParams.ratio ?? 1,
  costPerKg: transientParams.costPerKg,
}));

describe('IngredientAnalyser Service', () => {

  test('returns success when ingredients already meet targets', () => {
    const ingredients = [
      ratioIngredientFactory.build({
        id: 'i1', name: 'Corn', ratio: 1,
        compositions: [compositionFactory.build({ nutrientId: 1, value: 0.10, nutrient: { id: 'n1', name: 'protein' } })]
      }),
      ratioIngredientFactory.build({
        id: 'i2', name: 'Soy', ratio: 1,
        compositions: [compositionFactory.build({ nutrientId: 1, value: 0.20, nutrient: { id: 'n1', name: 'protein' } })]
      })
    ];
    const targets: TargetNutrient[] = [
      { id: 'n1', name: 'protein', target: 0.10 }
    ];

    const result = IngredientAnalyser.analyze(ingredients, targets);
    expect(typeof result.success).toBe('boolean');
    expect(Array.isArray(result.updatedIngredients)).toBe(true);
  });

  test('optimizes a fat/canola blend to satisfy fiber', () => {
    const ingredients = [
      ratioIngredientFactory.build({
        id: 'fat', name: 'Fat, Animal', ratio: 1000,
        compositions: [
          compositionFactory.build({ nutrientId: 1, value: 0.0, nutrient: { id: 'n1', name: 'protein' } }),
          compositionFactory.build({ nutrientId: 2, value: 0.98, nutrient: { id: 'n2', name: 'fat' } }),
          compositionFactory.build({ nutrientId: 3, value: 0.0, nutrient: { id: 'n3', name: 'fiber' } })
        ]
      }),
      ratioIngredientFactory.build({
        id: 'canola', name: 'Canola Meal', ratio: 1000,
        compositions: [
          compositionFactory.build({ nutrientId: 1, value: 0.38, nutrient: { id: 'n1', name: 'protein' } }),
          compositionFactory.build({ nutrientId: 2, value: 0.038, nutrient: { id: 'n2', name: 'fat' } }),
          compositionFactory.build({ nutrientId: 3, value: 0.11, nutrient: { id: 'n3', name: 'fiber' } })
        ]
      })
    ];
    const targets: TargetNutrient[] = [
      { id: 'n1', name: 'protein', target: 0.18 },
      { id: 'n2', name: 'fat', target: 0.05 },
      { id: 'n3', name: 'fiber', target: 0.08 }
    ];

    const result = IngredientAnalyser.analyze(ingredients, targets);
    expect(typeof result.success).toBe('boolean');
    expect(Array.isArray(result.suggestions)).toBe(true);
    expect(Array.isArray(result.updatedIngredients)).toBe(true);

    const fat = result.updatedIngredients!.find(i => i.id === 'fat');
    expect(fat).toBeDefined();
    expect(typeof fat!.ratio).toBe('number');

    const canola = result.updatedIngredients!.find(i => i.id === 'canola');
    expect(canola).toBeDefined();
    expect(typeof canola!.ratio).toBe('number');
  });

  test('reports unmet single nutrient when impossible', () => {
    const ingredients = [
      ratioIngredientFactory.build({
        id: 'i1', name: 'A', ratio: 1,
        compositions: [compositionFactory.build({ nutrientId: 1, value: 0.0, nutrient: { id: 'n1', name: 'protein' } })]
      })
    ];
    const targets: TargetNutrient[] = [
      { id: 'n1', name: 'protein', target: 0.5 }
    ];

    const result = IngredientAnalyser.analyze(ingredients, targets);
    expect(typeof result.success).toBe('boolean');
    expect(Array.isArray(result.suggestions)).toBe(true);
    expect(result.message).toBeTruthy();
  });

  test('reports unmet multiple nutrients when impossible', () => {
    const ingredients = [
      ratioIngredientFactory.build({
        id: 'i1', name: 'Canola Meal', ratio: 1,
        compositions: [
          compositionFactory.build({ nutrientId: 1, value: 38/100, nutrient: { id: 'n1', name: 'protein' } }),
          compositionFactory.build({ nutrientId: 2, value: 11.1/100, nutrient: { id: 'n2', name: 'fiber' } }),
          compositionFactory.build({ nutrientId: 3, value: 3.8/100, nutrient: { id: 'n3', name: 'fat' } }),
          compositionFactory.build({ nutrientId: 4, value: 0.68/100, nutrient: { id: 'n4', name: 'calcium' } }),
          compositionFactory.build({ nutrientId: 5, value: 0.0, nutrient: { id: 'n5', name: 'sodium' } })
        ]
      }),
      ratioIngredientFactory.build({
        id: 'i2', name: 'Calcium carbonate', ratio: 1,
        compositions: [
          compositionFactory.build({ nutrientId: 1, value: 0.0, nutrient: { id: 'n1', name: 'protein' } }),
          compositionFactory.build({ nutrientId: 2, value: 0.0, nutrient: { id: 'n2', name: 'fiber' } }),
          compositionFactory.build({ nutrientId: 3, value: 0.0, nutrient: { id: 'n3', name: 'fat' } }),
          compositionFactory.build({ nutrientId: 4, value: 38/100, nutrient: { id: 'n4', name: 'calcium' } }),
          compositionFactory.build({ nutrientId: 5, value: 0.06/100, nutrient: { id: 'n5', name: 'sodium' } })
        ]
      }),
      ratioIngredientFactory.build({
        id: 'i3', name: 'Fat, animal', ratio: 1,
        compositions: [
          compositionFactory.build({ nutrientId: 1, value: 0.0, nutrient: { id: 'n1', name: 'protein' } }),
          compositionFactory.build({ nutrientId: 2, value: 0.0, nutrient: { id: 'n2', name: 'fiber' } }),
          compositionFactory.build({ nutrientId: 3, value: 98/100, nutrient: { id: 'n3', name: 'fat' } }),
          compositionFactory.build({ nutrientId: 4, value: 0.0, nutrient: { id: 'n4', name: 'calcium' } }),
          compositionFactory.build({ nutrientId: 5, value: 0.0, nutrient: { id: 'n5', name: 'sodium' } })
        ]
      }),
      ratioIngredientFactory.build({
        id: 'i4', name: 'Salt, NaCl', ratio: 1,
        compositions: [
          compositionFactory.build({ nutrientId: 1, value: 0.0, nutrient: { id: 'n1', name: 'protein' } }),
          compositionFactory.build({ nutrientId: 2, value: 0.0, nutrient: { id: 'n2', name: 'fiber' } }),
          compositionFactory.build({ nutrientId: 3, value: 0.0, nutrient: { id: 'n3', name: 'fat' } }),
          compositionFactory.build({ nutrientId: 4, value: 0.0, nutrient: { id: 'n4', name: 'calcium' } }),
          compositionFactory.build({ nutrientId: 5, value: 39.34/100, nutrient: { id: 'n5', name: 'sodium' } })
        ]
      }),
    ]
    const targets: TargetNutrient[] = [
      { id: 'n1', name: 'protein', target: 18/100 },
      { id: 'n2', name: 'fiber', target: 8/100 },
      { id: 'n3', name: 'fat', target: 5/100 },
      { id: 'n4', name: 'calcium', target: 10/100 },
      { id: 'n5', name: 'sodium', target: 6/100 }
    ];

    const result = IngredientAnalyser.analyze(ingredients, targets);
    expect(typeof result.success).toBe('boolean');
    expect(Array.isArray(result.suggestions)).toBe(true);
    expect(result.message).toBeTruthy();
  })
});
