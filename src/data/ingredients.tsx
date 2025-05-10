import { INGREDIENT_CATEGORIES, IngredientCategory } from "./ingredient_categories";
import { getNutrients, Nutrient } from "./nutrients";

export type Composition = {
    value: number;
    nutrientId: number;
    nutrient?: Nutrient;
};

export type Ingredient = {
    id: string;
    name: string;
    description: string;
    key_benefits: string[];
    applications: string[];
    categoryId: number;
    category?: IngredientCategory;
    compositions: Composition[];
};

// Types
export interface RatioIngredient extends Ingredient {
  ratio: number;
  costPerKg?: number;
}

const ALL_INGREDIENTS: Ingredient[] = [
    {
        "id": "1",
        "name": "Barley, grain",
        "description": "A highly digestible cereal grain providing excellent energy content for livestock. Contains moderate protein levels and is rich in fiber, supporting digestive health. Often used as partial replacement for corn in feed formulations.",
        "key_benefits": [
            "Good energy source",
            "High in digestible fiber",
            "Contains beta-glucans (immune support)",
            "Lower starch content than corn"
        ],
        "applications": [
            "Dairy cattle",
            "Beef cattle",
            "Swine",
            "Poultry",
            "Sheep",
            "Goats"
        ],
        "categoryId": 1,
        "compositions": [
            {
                "value": 89,
                "nutrientId": 1
            },
            {
                "value": 11.5,
                "nutrientId": 2
            },
            {
                "value": 1.9,
                "nutrientId": 3
            },
            {
                "value": 5,
                "nutrientId": 4
            },
            {
                "value": 0.08,
                "nutrientId": 5
            },
            {
                "value": 0.42,
                "nutrientId": 6
            },
            {
                "value": 0.15,
                "nutrientId": 7
            },
            {
                "value": 0.03,
                "nutrientId": 8
            },
            {
                "value": 0.14,
                "nutrientId": 9
            },
            {
                "value": 0.56,
                "nutrientId": 10
            },
            {
                "value": 0.15,
                "nutrientId": 11
            },
            {
                "value": 1250,
                "nutrientId": 12
            },
            {
                "value": 2750,
                "nutrientId": 13
            },
            {
                "value": 11.51,
                "nutrientId": 14
            },
            {
                "value": 1.1,
                "nutrientId": 15
            },
            {
                "value": 1027,
                "nutrientId": 16
            },
            {
                "value": 0.53,
                "nutrientId": 17
            },
            {
                "value": 0.41,
                "nutrientId": 18
            },
            {
                "value": 0.18,
                "nutrientId": 19
            },
            {
                "value": 0.14,
                "nutrientId": 20
            },
            {
                "value": 0.25,
                "nutrientId": 21
            },
            {
                "value": 0.2,
                "nutrientId": 22
            },
            {
                "value": 0.36,
                "nutrientId": 23
            },
            {
                "value": 0.28,
                "nutrientId": 24
            },
            {
                "value": 0.17,
                "nutrientId": 25
            },
            {
                "value": 0.12,
                "nutrientId": 26
            },
            {
                "value": 0.5,
                "nutrientId": 27
            },
            {
                "value": 0.43,
                "nutrientId": 28
            },
            {
                "value": 0.42,
                "nutrientId": 29
            },
            {
                "value": 0.34,
                "nutrientId": 30
            },
            {
                "value": 0.62,
                "nutrientId": 31
            },
            {
                "value": 0.5,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "2",
        "name": "Beans, broad (vicia faba)",
        "description": "Nutrient-dense legume offering high-quality plant protein with good amino acid profile. Contains valuable minerals and supports sustainable farming practices through nitrogen fixation. Requires proper processing to remove anti-nutritional factors.",
        "key_benefits": [
            "Excellent protein source (22-28%)",
            "Rich in lysine and other amino acids",
            "Good mineral content (calcium, phosphorus)",
            "Environmentally friendly crop"
        ],
        "applications": [
            "Dairy cattle",
            "Beef cattle",
            "Sheep",
            "Goats",
            "Poultry (processed)"
        ],
        "categoryId": 3,
        "compositions": [
            {
                "value": 89,
                "nutrientId": 1
            },
            {
                "value": 25.7,
                "nutrientId": 2
            },
            {
                "value": 1.4,
                "nutrientId": 3
            },
            {
                "value": 8.2,
                "nutrientId": 4
            },
            {
                "value": 0.14,
                "nutrientId": 5
            },
            {
                "value": 0.54,
                "nutrientId": 6
            },
            {
                "value": 0.2,
                "nutrientId": 7
            },
            {
                "value": 0.08,
                "nutrientId": 8
            },
            {
                "value": 0.04,
                "nutrientId": 9
            },
            {
                "value": 1.2,
                "nutrientId": 10
            },
            {
                "value": 0,
                "nutrientId": 11
            },
            {
                "value": 1100,
                "nutrientId": 12
            },
            {
                "value": 2420,
                "nutrientId": 13
            },
            {
                "value": 10.13,
                "nutrientId": 14
            },
            {
                "value": 0.9,
                "nutrientId": 15
            },
            {
                "value": 1670,
                "nutrientId": 16
            },
            {
                "value": 1.52,
                "nutrientId": 17
            },
            {
                "value": 1.29,
                "nutrientId": 18
            },
            {
                "value": 0.25,
                "nutrientId": 19
            },
            {
                "value": 0.18,
                "nutrientId": 20
            },
            {
                "value": 0.14,
                "nutrientId": 21
            },
            {
                "value": 0.09,
                "nutrientId": 22
            },
            {
                "value": 0.98,
                "nutrientId": 23
            },
            {
                "value": 0.77,
                "nutrientId": 24
            },
            {
                "value": 0.24,
                "nutrientId": 25
            },
            {
                "value": 0.16,
                "nutrientId": 26
            },
            {
                "value": 2.2,
                "nutrientId": 27
            },
            {
                "value": 1.91,
                "nutrientId": 28
            },
            {
                "value": 1,
                "nutrientId": 29
            },
            {
                "value": 0.73,
                "nutrientId": 30
            },
            {
                "value": 1.22,
                "nutrientId": 31
            },
            {
                "value": 0.88,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "3",
        "name": "Calcium carbonate (38%Ca)",
        "description": "Essential mineral supplement providing highly bioavailable calcium for bone development, eggshell formation, and metabolic functions. Neutralizes acidity in digestive systems and supports nerve/muscle function. Pure form with consistent quality.",
        "key_benefits": [
            "38% highly available calcium",
            "Supports skeletal health",
            "Improves eggshell quality",
            "Aids digestive pH balance"
        ],
        "applications": [
            "All livestock",
            "Poultry",
            "Dairy cattle",
            "Laying hens",
            "Swine"
        ],
        "categoryId": 5,
        "compositions": [
            {
                "value": 99,
                "nutrientId": 1
            },
            {
                "value": 0,
                "nutrientId": 2
            },
            {
                "value": 0,
                "nutrientId": 3
            },
            {
                "value": 0,
                "nutrientId": 4
            },
            {
                "value": 38,
                "nutrientId": 5
            },
            {
                "value": 0,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 0.06,
                "nutrientId": 8
            },
            {
                "value": 0,
                "nutrientId": 9
            },
            {
                "value": 0.06,
                "nutrientId": 10
            },
            {
                "value": 0,
                "nutrientId": 11
            },
            {
                "value": 0,
                "nutrientId": 12
            },
            {
                "value": 0,
                "nutrientId": 13
            },
            {
                "value": 0,
                "nutrientId": 14
            },
            {
                "value": 0,
                "nutrientId": 15
            },
            {
                "value": 0,
                "nutrientId": 16
            },
            {
                "value": 0,
                "nutrientId": 17
            },
            {
                "value": 0,
                "nutrientId": 18
            },
            {
                "value": 0,
                "nutrientId": 19
            },
            {
                "value": 0,
                "nutrientId": 20
            },
            {
                "value": 0,
                "nutrientId": 21
            },
            {
                "value": 0,
                "nutrientId": 22
            },
            {
                "value": 0,
                "nutrientId": 23
            },
            {
                "value": 0,
                "nutrientId": 24
            },
            {
                "value": 0,
                "nutrientId": 25
            },
            {
                "value": 0,
                "nutrientId": 26
            },
            {
                "value": 0,
                "nutrientId": 27
            },
            {
                "value": 0,
                "nutrientId": 28
            },
            {
                "value": 0,
                "nutrientId": 29
            },
            {
                "value": 0,
                "nutrientId": 30
            },
            {
                "value": 0,
                "nutrientId": 31
            },
            {
                "value": 0,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "4",
        "name": "Canola meal (38%)1",
        "description": "Premium plant-based protein source with superior amino acid balance compared to other oilseed meals. Low in anti-nutritional factors and highly palatable. Contains beneficial levels of phosphorus and healthy fats remaining after oil extraction.",
        "key_benefits": [
            "High protein content (36-38%)",
            "Excellent amino acid profile",
            "Low in fiber",
            "Good phosphorus source"
        ],
        "applications": [
            "Dairy cattle",
            "Beef cattle",
            "Swine",
            "Poultry",
            "Sheep",
            "Goats"
        ],
        "categoryId": 3,
        "compositions": [
            {
                "value": 91,
                "nutrientId": 1
            },
            {
                "value": 38,
                "nutrientId": 2
            },
            {
                "value": 3.8,
                "nutrientId": 3
            },
            {
                "value": 11.1,
                "nutrientId": 4
            },
            {
                "value": 0.68,
                "nutrientId": 5
            },
            {
                "value": 1.2,
                "nutrientId": 6
            },
            {
                "value": 0.4,
                "nutrientId": 7
            },
            {
                "value": 0,
                "nutrientId": 8
            },
            {
                "value": 0,
                "nutrientId": 9
            },
            {
                "value": 1.29,
                "nutrientId": 10
            },
            {
                "value": 1,
                "nutrientId": 11
            },
            {
                "value": 960,
                "nutrientId": 12
            },
            {
                "value": 2110,
                "nutrientId": 13
            },
            {
                "value": 8.83,
                "nutrientId": 14
            },
            {
                "value": 0,
                "nutrientId": 15
            },
            {
                "value": 6700,
                "nutrientId": 16
            },
            {
                "value": 2.02,
                "nutrientId": 17
            },
            {
                "value": 1.6,
                "nutrientId": 18
            },
            {
                "value": 0.77,
                "nutrientId": 19
            },
            {
                "value": 0.69,
                "nutrientId": 20
            },
            {
                "value": 0.97,
                "nutrientId": 21
            },
            {
                "value": 0.71,
                "nutrientId": 22
            },
            {
                "value": 1.5,
                "nutrientId": 23
            },
            {
                "value": 1.17,
                "nutrientId": 24
            },
            {
                "value": 0.46,
                "nutrientId": 25
            },
            {
                "value": 0.38,
                "nutrientId": 26
            },
            {
                "value": 2.3,
                "nutrientId": 27
            },
            {
                "value": 2.07,
                "nutrientId": 28
            },
            {
                "value": 1.51,
                "nutrientId": 29
            },
            {
                "value": 1.25,
                "nutrientId": 30
            },
            {
                "value": 1.94,
                "nutrientId": 31
            },
            {
                "value": 1.59,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "5",
        "name": "Corn, yellow, grain",
        "description": "The gold standard energy source in animal feeds, providing highly digestible carbohydrates and starch. High energy density supports growth and production. Contains natural pigments (xanthophylls) that enhance egg yolk and skin coloration.",
        "key_benefits": [
            "Highest energy among cereals",
            "Highly palatable",
            "Good starch content",
            "Natural pigment source"
        ],
        "applications": [
            "All livestock",
            "Poultry",
            "Swine",
            "Dairy cattle",
            "Beef cattle"
        ],
        "categoryId": 1,
        "compositions": [
            {
                "value": 86,
                "nutrientId": 1
            },
            {
                "value": 7.5,
                "nutrientId": 2
            },
            {
                "value": 3.5,
                "nutrientId": 3
            },
            {
                "value": 1.9,
                "nutrientId": 4
            },
            {
                "value": 0.01,
                "nutrientId": 5
            },
            {
                "value": 0.28,
                "nutrientId": 6
            },
            {
                "value": 0.12,
                "nutrientId": 7
            },
            {
                "value": 0.02,
                "nutrientId": 8
            },
            {
                "value": 0.04,
                "nutrientId": 9
            },
            {
                "value": 0.33,
                "nutrientId": 10
            },
            {
                "value": 0.08,
                "nutrientId": 11
            },
            {
                "value": 1530,
                "nutrientId": 12
            },
            {
                "value": 3373,
                "nutrientId": 13
            },
            {
                "value": 14.11,
                "nutrientId": 14
            },
            {
                "value": 1.9,
                "nutrientId": 15
            },
            {
                "value": 1100,
                "nutrientId": 16
            },
            {
                "value": 0.24,
                "nutrientId": 17
            },
            {
                "value": 0.19,
                "nutrientId": 18
            },
            {
                "value": 0.18,
                "nutrientId": 19
            },
            {
                "value": 0.16,
                "nutrientId": 20
            },
            {
                "value": 0.18,
                "nutrientId": 21
            },
            {
                "value": 0.15,
                "nutrientId": 22
            },
            {
                "value": 0.29,
                "nutrientId": 23
            },
            {
                "value": 0.24,
                "nutrientId": 24
            },
            {
                "value": 0.07,
                "nutrientId": 25
            },
            {
                "value": 0.06,
                "nutrientId": 26
            },
            {
                "value": 0.4,
                "nutrientId": 27
            },
            {
                "value": 0.36,
                "nutrientId": 28
            },
            {
                "value": 0.29,
                "nutrientId": 29
            },
            {
                "value": 0.26,
                "nutrientId": 30
            },
            {
                "value": 0.42,
                "nutrientId": 31
            },
            {
                "value": 0.37,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "6",
        "name": "Corn gluten meal (60%)",
        "description": "Concentrated protein byproduct from corn wet milling process. Exceptionally high in methionine and cystine - critical for poultry feathering and overall protein synthesis. Low fiber content enhances digestibility.",
        "key_benefits": [
            "60% crude protein",
            "Rich in sulfur amino acids",
            "Highly digestible",
            "Natural xanthophylls"
        ],
        "applications": [
            "Poultry",
            "Swine",
            "Aquaculture",
            "Pet food",
            "Dairy cattle"
        ],
        "categoryId": 2,
        "compositions": [
            {
                "value": 90,
                "nutrientId": 1
            },
            {
                "value": 60,
                "nutrientId": 2
            },
            {
                "value": 2,
                "nutrientId": 3
            },
            {
                "value": 2.5,
                "nutrientId": 4
            },
            {
                "value": 0.02,
                "nutrientId": 5
            },
            {
                "value": 0.5,
                "nutrientId": 6
            },
            {
                "value": 0.18,
                "nutrientId": 7
            },
            {
                "value": 0.03,
                "nutrientId": 8
            },
            {
                "value": 0.05,
                "nutrientId": 9
            },
            {
                "value": 0.45,
                "nutrientId": 10
            },
            {
                "value": 0.5,
                "nutrientId": 11
            },
            {
                "value": 1700,
                "nutrientId": 12
            },
            {
                "value": 3740,
                "nutrientId": 13
            },
            {
                "value": 15.65,
                "nutrientId": 14
            },
            {
                "value": 1.8,
                "nutrientId": 15
            },
            {
                "value": 2200,
                "nutrientId": 16
            },
            {
                "value": 1,
                "nutrientId": 17
            },
            {
                "value": 0.88,
                "nutrientId": 18
            },
            {
                "value": 1.9,
                "nutrientId": 19
            },
            {
                "value": 1.84,
                "nutrientId": 20
            },
            {
                "value": 1.1,
                "nutrientId": 21
            },
            {
                "value": 0.95,
                "nutrientId": 22
            },
            {
                "value": 2,
                "nutrientId": 23
            },
            {
                "value": 1.84,
                "nutrientId": 24
            },
            {
                "value": 0.3,
                "nutrientId": 25
            },
            {
                "value": 0.25,
                "nutrientId": 26
            },
            {
                "value": 1.9,
                "nutrientId": 27
            },
            {
                "value": 1.82,
                "nutrientId": 28
            },
            {
                "value": 2.3,
                "nutrientId": 29
            },
            {
                "value": 2.19,
                "nutrientId": 30
            },
            {
                "value": 2.7,
                "nutrientId": 31
            },
            {
                "value": 2.57,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "7",
        "name": "Cottonseed meal (41%), mech. extd",
        "description": "Valuable protein supplement produced through mechanical extraction. Contains residual oil that increases energy value. Must be properly processed to reduce gossypol content. Excellent for ruminant feeds when balanced properly.",
        "key_benefits": [
            "Good protein source (41%)",
            "Higher energy than solvent-extracted",
            "Rich in phosphorus",
            "Cost-effective"
        ],
        "applications": [
            "Dairy cattle",
            "Beef cattle",
            "Sheep",
            "Goats",
            "Poultry (limited)"
        ],
        "categoryId": 3,
        "compositions": [
            {
                "value": 91,
                "nutrientId": 1
            },
            {
                "value": 41,
                "nutrientId": 2
            },
            {
                "value": 3.9,
                "nutrientId": 3
            },
            {
                "value": 12.6,
                "nutrientId": 4
            },
            {
                "value": 0.17,
                "nutrientId": 5
            },
            {
                "value": 0.97,
                "nutrientId": 6
            },
            {
                "value": 0.32,
                "nutrientId": 7
            },
            {
                "value": 0.04,
                "nutrientId": 8
            },
            {
                "value": 0.04,
                "nutrientId": 9
            },
            {
                "value": 1.2,
                "nutrientId": 10
            },
            {
                "value": 0.4,
                "nutrientId": 11
            },
            {
                "value": 955,
                "nutrientId": 12
            },
            {
                "value": 2100,
                "nutrientId": 13
            },
            {
                "value": 8.79,
                "nutrientId": 14
            },
            {
                "value": 0.8,
                "nutrientId": 15
            },
            {
                "value": 2807,
                "nutrientId": 16
            },
            {
                "value": 1.52,
                "nutrientId": 17
            },
            {
                "value": 0.99,
                "nutrientId": 18
            },
            {
                "value": 0.55,
                "nutrientId": 19
            },
            {
                "value": 0.4,
                "nutrientId": 20
            },
            {
                "value": 0.59,
                "nutrientId": 21
            },
            {
                "value": 0.44,
                "nutrientId": 22
            },
            {
                "value": 1.3,
                "nutrientId": 23
            },
            {
                "value": 0.88,
                "nutrientId": 24
            },
            {
                "value": 0.5,
                "nutrientId": 25
            },
            {
                "value": 0.39,
                "nutrientId": 26
            },
            {
                "value": 4.33,
                "nutrientId": 27
            },
            {
                "value": 3.81,
                "nutrientId": 28
            },
            {
                "value": 1.31,
                "nutrientId": 29
            },
            {
                "value": 0.93,
                "nutrientId": 30
            },
            {
                "value": 1.84,
                "nutrientId": 31
            },
            {
                "value": 1.36,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "8",
        "name": "Cottonseed meal (41%), direct solv.",
        "description": "Consistent-quality plant protein with lower gossypol content than mechanically extracted meal. Excellent amino acid profile though slightly deficient in lysine. Particularly useful in dairy cattle rations when properly supplemented.",
        "key_benefits": [
            "Lower gossypol content",
            "Uniform quality",
            "Good rumen bypass protein",
            "High phosphorus"
        ],
        "applications": [
            "Dairy cattle",
            "Beef cattle",
            "Sheep",
            "Goats",
            "Poultry (limited)"
        ],
        "categoryId": 3,
        "compositions": [
            {
                "value": 90,
                "nutrientId": 1
            },
            {
                "value": 41,
                "nutrientId": 2
            },
            {
                "value": 2.1,
                "nutrientId": 3
            },
            {
                "value": 11.3,
                "nutrientId": 4
            },
            {
                "value": 0.16,
                "nutrientId": 5
            },
            {
                "value": 1,
                "nutrientId": 6
            },
            {
                "value": 0.32,
                "nutrientId": 7
            },
            {
                "value": 0.04,
                "nutrientId": 8
            },
            {
                "value": 0.04,
                "nutrientId": 9
            },
            {
                "value": 1.16,
                "nutrientId": 10
            },
            {
                "value": 0.3,
                "nutrientId": 11
            },
            {
                "value": 915,
                "nutrientId": 12
            },
            {
                "value": 2010,
                "nutrientId": 13
            },
            {
                "value": 8.41,
                "nutrientId": 14
            },
            {
                "value": 0.4,
                "nutrientId": 15
            },
            {
                "value": 2706,
                "nutrientId": 16
            },
            {
                "value": 1.7,
                "nutrientId": 17
            },
            {
                "value": 1.11,
                "nutrientId": 18
            },
            {
                "value": 0.51,
                "nutrientId": 19
            },
            {
                "value": 0.37,
                "nutrientId": 20
            },
            {
                "value": 0.62,
                "nutrientId": 21
            },
            {
                "value": 0.46,
                "nutrientId": 22
            },
            {
                "value": 1.31,
                "nutrientId": 23
            },
            {
                "value": 0.89,
                "nutrientId": 24
            },
            {
                "value": 0.52,
                "nutrientId": 25
            },
            {
                "value": 0.41,
                "nutrientId": 26
            },
            {
                "value": 4.66,
                "nutrientId": 27
            },
            {
                "value": 4.1,
                "nutrientId": 28
            },
            {
                "value": 1.33,
                "nutrientId": 29
            },
            {
                "value": 0.95,
                "nutrientId": 30
            },
            {
                "value": 1.82,
                "nutrientId": 31
            },
            {
                "value": 1.34,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "9",
        "name": "Dicalcium phosphate (18.5% P)",
        "description": "Premium mineral supplement providing both highly available phosphorus and calcium in optimal ratio. Supports bone development, metabolic functions and milk/egg production. Particularly important for fast-growing animals and high-producing livestock.",
        "key_benefits": [
            "18.5% available phosphorus",
            "21% calcium",
            "Optimal Ca:P ratio",
            "Highly bioavailable"
        ],
        "applications": [
            "All livestock",
            "Poultry",
            "Swine",
            "Dairy cattle",
            "Aquaculture"
        ],
        "categoryId": 5,
        "compositions": [
            {
                "value": 99,
                "nutrientId": 1
            },
            {
                "value": 0,
                "nutrientId": 2
            },
            {
                "value": 0,
                "nutrientId": 3
            },
            {
                "value": 0,
                "nutrientId": 4
            },
            {
                "value": 22,
                "nutrientId": 5
            },
            {
                "value": 18.5,
                "nutrientId": 6
            },
            {
                "value": 18.5,
                "nutrientId": 7
            },
            {
                "value": 0.08,
                "nutrientId": 8
            },
            {
                "value": 0,
                "nutrientId": 9
            },
            {
                "value": 0.07,
                "nutrientId": 10
            },
            {
                "value": 0,
                "nutrientId": 11
            },
            {
                "value": 0,
                "nutrientId": 12
            },
            {
                "value": 0,
                "nutrientId": 13
            },
            {
                "value": 0,
                "nutrientId": 14
            },
            {
                "value": 0,
                "nutrientId": 15
            },
            {
                "value": 0,
                "nutrientId": 16
            },
            {
                "value": 0,
                "nutrientId": 17
            },
            {
                "value": 0,
                "nutrientId": 18
            },
            {
                "value": 0,
                "nutrientId": 19
            },
            {
                "value": 0,
                "nutrientId": 20
            },
            {
                "value": 0,
                "nutrientId": 21
            },
            {
                "value": 0,
                "nutrientId": 22
            },
            {
                "value": 0,
                "nutrientId": 23
            },
            {
                "value": 0,
                "nutrientId": 24
            },
            {
                "value": 0,
                "nutrientId": 25
            },
            {
                "value": 0,
                "nutrientId": 26
            },
            {
                "value": 0,
                "nutrientId": 27
            },
            {
                "value": 0,
                "nutrientId": 28
            },
            {
                "value": 0,
                "nutrientId": 29
            },
            {
                "value": 0,
                "nutrientId": 30
            },
            {
                "value": 0,
                "nutrientId": 31
            },
            {
                "value": 0,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "10",
        "name": "DL-Methionine",
        "description": "Synthetic essential amino acid critical for protein synthesis, feather development and overall metabolic functions. First limiting amino acid in poultry diets. Improves feed efficiency and supports immune function through antioxidant properties.",
        "key_benefits": [
            "Essential amino acid",
            "Supports feathering",
            "Antioxidant properties",
            "Improves feed conversion"
        ],
        "applications": [
            "Poultry",
            "Swine",
            "Aquaculture",
            "Pet food"
        ],
        "categoryId": 6,
        "compositions": [
            {
                "value": 99,
                "nutrientId": 1
            },
            {
                "value": 58.1,
                "nutrientId": 2
            },
            {
                "value": 0,
                "nutrientId": 3
            },
            {
                "value": 0,
                "nutrientId": 4
            },
            {
                "value": 0,
                "nutrientId": 5
            },
            {
                "value": 0,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 0,
                "nutrientId": 8
            },
            {
                "value": 0,
                "nutrientId": 9
            },
            {
                "value": 0,
                "nutrientId": 10
            },
            {
                "value": 0,
                "nutrientId": 11
            },
            {
                "value": 2277,
                "nutrientId": 12
            },
            {
                "value": 5020,
                "nutrientId": 13
            },
            {
                "value": 21,
                "nutrientId": 14
            },
            {
                "value": 0,
                "nutrientId": 15
            },
            {
                "value": 0,
                "nutrientId": 16
            },
            {
                "value": 0,
                "nutrientId": 17
            },
            {
                "value": 0,
                "nutrientId": 18
            },
            {
                "value": 99,
                "nutrientId": 19
            },
            {
                "value": 99,
                "nutrientId": 20
            },
            {
                "value": 0,
                "nutrientId": 21
            },
            {
                "value": 0,
                "nutrientId": 22
            },
            {
                "value": 0,
                "nutrientId": 23
            },
            {
                "value": 0,
                "nutrientId": 24
            },
            {
                "value": 0,
                "nutrientId": 25
            },
            {
                "value": 0,
                "nutrientId": 26
            },
            {
                "value": 0,
                "nutrientId": 27
            },
            {
                "value": 0,
                "nutrientId": 28
            },
            {
                "value": 0,
                "nutrientId": 29
            },
            {
                "value": 0,
                "nutrientId": 30
            },
            {
                "value": 0,
                "nutrientId": 31
            },
            {
                "value": 0,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "11",
        "name": "Fat, animal",
        "description": "High-energy fat source derived from animal tissues, providing concentrated calories for growth and production. Enhances feed palatability and reduces dustiness. Contains saturated fatty acids that are efficiently utilized by livestock.",
        "key_benefits": [
            "2.25x energy of carbohydrates",
            "Improves feed efficiency",
            "Essential fatty acid source",
            "Reduces feed dust"
        ],
        "applications": [
            "Poultry",
            "Swine",
            "Beef cattle",
            "Pet food",
            "Aquaculture"
        ],
        "categoryId": 7,
        "compositions": [
            {
                "value": 99,
                "nutrientId": 1
            },
            {
                "value": 0,
                "nutrientId": 2
            },
            {
                "value": 98,
                "nutrientId": 3
            },
            {
                "value": 0,
                "nutrientId": 4
            },
            {
                "value": 0,
                "nutrientId": 5
            },
            {
                "value": 0,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 0,
                "nutrientId": 8
            },
            {
                "value": 0,
                "nutrientId": 9
            },
            {
                "value": 0,
                "nutrientId": 10
            },
            {
                "value": 0,
                "nutrientId": 11
            },
            {
                "value": 3600,
                "nutrientId": 12
            },
            {
                "value": 7920,
                "nutrientId": 13
            },
            {
                "value": 33.14,
                "nutrientId": 14
            },
            {
                "value": 0,
                "nutrientId": 15
            },
            {
                "value": 0,
                "nutrientId": 16
            },
            {
                "value": 0,
                "nutrientId": 17
            },
            {
                "value": 0,
                "nutrientId": 18
            },
            {
                "value": 0,
                "nutrientId": 19
            },
            {
                "value": 0,
                "nutrientId": 20
            },
            {
                "value": 0,
                "nutrientId": 21
            },
            {
                "value": 0,
                "nutrientId": 22
            },
            {
                "value": 0,
                "nutrientId": 23
            },
            {
                "value": 0,
                "nutrientId": 24
            },
            {
                "value": 0,
                "nutrientId": 25
            },
            {
                "value": 0,
                "nutrientId": 26
            },
            {
                "value": 0,
                "nutrientId": 27
            },
            {
                "value": 0,
                "nutrientId": 28
            },
            {
                "value": 0,
                "nutrientId": 29
            },
            {
                "value": 0,
                "nutrientId": 30
            },
            {
                "value": 0,
                "nutrientId": 31
            },
            {
                "value": 0,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "12",
        "name": "Fat, vegetable",
        "description": "Plant-derived lipid source rich in unsaturated fatty acids. Provides concentrated energy and essential fatty acids for skin/coat health. Often used in poultry diets to increase calorie density without raising protein levels.",
        "key_benefits": [
            "High in unsaturated fats",
            "Energy dense (8.5 kcal/g)",
            "Improves feather condition",
            "Long shelf life"
        ],
        "applications": [
            "All livestock",
            "Poultry",
            "Swine",
            "Dairy cattle",
            "Aquaculture"
        ],
        "categoryId": 7,
        "compositions": [
            {
                "value": 99,
                "nutrientId": 1
            },
            {
                "value": 0,
                "nutrientId": 2
            },
            {
                "value": 99,
                "nutrientId": 3
            },
            {
                "value": 0,
                "nutrientId": 4
            },
            {
                "value": 0,
                "nutrientId": 5
            },
            {
                "value": 0,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 0,
                "nutrientId": 8
            },
            {
                "value": 0,
                "nutrientId": 9
            },
            {
                "value": 0,
                "nutrientId": 10
            },
            {
                "value": 0,
                "nutrientId": 11
            },
            {
                "value": 4000,
                "nutrientId": 12
            },
            {
                "value": 8800,
                "nutrientId": 13
            },
            {
                "value": 36.82,
                "nutrientId": 14
            },
            {
                "value": 40,
                "nutrientId": 15
            },
            {
                "value": 0,
                "nutrientId": 16
            },
            {
                "value": 0,
                "nutrientId": 17
            },
            {
                "value": 0,
                "nutrientId": 18
            },
            {
                "value": 0,
                "nutrientId": 19
            },
            {
                "value": 0,
                "nutrientId": 20
            },
            {
                "value": 0,
                "nutrientId": 21
            },
            {
                "value": 0,
                "nutrientId": 22
            },
            {
                "value": 0,
                "nutrientId": 23
            },
            {
                "value": 0,
                "nutrientId": 24
            },
            {
                "value": 0,
                "nutrientId": 25
            },
            {
                "value": 0,
                "nutrientId": 26
            },
            {
                "value": 0,
                "nutrientId": 27
            },
            {
                "value": 0,
                "nutrientId": 28
            },
            {
                "value": 0,
                "nutrientId": 29
            },
            {
                "value": 0,
                "nutrientId": 30
            },
            {
                "value": 0,
                "nutrientId": 31
            },
            {
                "value": 0,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "13",
        "name": "Fish meal, anchovy, Peruvian",
        "description": "Premium animal protein source made from whole anchovies, exceptionally rich in essential amino acids, omega-3 fatty acids (EPA/DHA), and minerals. Highly digestible with excellent palatability. Industry standard for aqua feeds and starter diets.",
        "key_benefits": [
            "65-68% high-quality protein",
            "Rich in omega-3 fatty acids",
            "Excellent mineral profile",
            "Highly palatable"
        ],
        "applications": [
            "Aquaculture",
            "Poultry",
            "Swine",
            "Pet food",
            "Dairy calves"
        ],
        "categoryId": 4,
        "compositions": [
            {
                "value": 91,
                "nutrientId": 1
            },
            {
                "value": 65,
                "nutrientId": 2
            },
            {
                "value": 10,
                "nutrientId": 3
            },
            {
                "value": 1,
                "nutrientId": 4
            },
            {
                "value": 0,
                "nutrientId": 5
            },
            {
                "value": 0,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 0.88,
                "nutrientId": 8
            },
            {
                "value": 0.6,
                "nutrientId": 9
            },
            {
                "value": 0.9,
                "nutrientId": 10
            },
            {
                "value": 0.54,
                "nutrientId": 11
            },
            {
                "value": 1280,
                "nutrientId": 12
            },
            {
                "value": 2820,
                "nutrientId": 13
            },
            {
                "value": 11.8,
                "nutrientId": 14
            },
            {
                "value": 0.1,
                "nutrientId": 15
            },
            {
                "value": 5100,
                "nutrientId": 16
            },
            {
                "value": 4.9,
                "nutrientId": 17
            },
            {
                "value": 4.21,
                "nutrientId": 18
            },
            {
                "value": 1.9,
                "nutrientId": 19
            },
            {
                "value": 1.63,
                "nutrientId": 20
            },
            {
                "value": 0.6,
                "nutrientId": 21
            },
            {
                "value": 0.43,
                "nutrientId": 22
            },
            {
                "value": 2.7,
                "nutrientId": 23
            },
            {
                "value": 2.17,
                "nutrientId": 24
            },
            {
                "value": 0.75,
                "nutrientId": 25
            },
            {
                "value": 0.59,
                "nutrientId": 26
            },
            {
                "value": 3.38,
                "nutrientId": 27
            },
            {
                "value": 2.77,
                "nutrientId": 28
            },
            {
                "value": 3,
                "nutrientId": 29
            },
            {
                "value": 2.55,
                "nutrientId": 30
            },
            {
                "value": 3.4,
                "nutrientId": 31
            },
            {
                "value": 2.82,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "14",
        "name": "Fish meal, white",
        "description": "High-quality protein supplement from white fish species, with lower oil content than anchovy meal. Particularly valuable for its balanced amino acid profile and high lysine content. Heat-processed to ensure safety and digestibility.",
        "key_benefits": [
            "Consistent protein quality",
            "Low histamine levels",
            "High methionine content",
            "Good for sensitive diets"
        ],
        "applications": [
            "Aquaculture",
            "Poultry",
            "Swine",
            "Pet food",
            "Young livestock"
        ],
        "categoryId": 4,
        "compositions": [
            {
                "value": 91,
                "nutrientId": 1
            },
            {
                "value": 61,
                "nutrientId": 2
            },
            {
                "value": 4,
                "nutrientId": 3
            },
            {
                "value": 1,
                "nutrientId": 4
            },
            {
                "value": 0,
                "nutrientId": 5
            },
            {
                "value": 0,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 0.97,
                "nutrientId": 8
            },
            {
                "value": 0.5,
                "nutrientId": 9
            },
            {
                "value": 1.1,
                "nutrientId": 10
            },
            {
                "value": 0.22,
                "nutrientId": 11
            },
            {
                "value": 1180,
                "nutrientId": 12
            },
            {
                "value": 2600,
                "nutrientId": 13
            },
            {
                "value": 10.88,
                "nutrientId": 14
            },
            {
                "value": 0.1,
                "nutrientId": 15
            },
            {
                "value": 4050,
                "nutrientId": 16
            },
            {
                "value": 4.3,
                "nutrientId": 17
            },
            {
                "value": 3.7,
                "nutrientId": 18
            },
            {
                "value": 1.65,
                "nutrientId": 19
            },
            {
                "value": 1.42,
                "nutrientId": 20
            },
            {
                "value": 0.75,
                "nutrientId": 21
            },
            {
                "value": 0.54,
                "nutrientId": 22
            },
            {
                "value": 2.6,
                "nutrientId": 23
            },
            {
                "value": 2.09,
                "nutrientId": 24
            },
            {
                "value": 0.7,
                "nutrientId": 25
            },
            {
                "value": 0.55,
                "nutrientId": 26
            },
            {
                "value": 4.2,
                "nutrientId": 27
            },
            {
                "value": 3.44,
                "nutrientId": 28
            },
            {
                "value": 3.1,
                "nutrientId": 29
            },
            {
                "value": 2.64,
                "nutrientId": 30
            },
            {
                "value": 3.25,
                "nutrientId": 31
            },
            {
                "value": 2.7,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "15",
        "name": "Flaxseed",
        "description": "Nutritionally dense seed exceptionally high in omega-3 fatty acids (ALA) and soluble fiber. Supports skin/coat health and provides natural lubrication in feeds. Must be ground or heat-treated for optimal nutrient availability.",
        "key_benefits": [
            "Richest plant omega-3 source",
            "High in lignans (antioxidants)",
            "Good fiber content",
            "Improves coat condition"
        ],
        "applications": [
            "Dairy cattle",
            "Horses",
            "Poultry",
            "Swine",
            "Pet food"
        ],
        "categoryId": 9,
        "compositions": [
            {
                "value": 92,
                "nutrientId": 1
            },
            {
                "value": 22,
                "nutrientId": 2
            },
            {
                "value": 34,
                "nutrientId": 3
            },
            {
                "value": 6.5,
                "nutrientId": 4
            },
            {
                "value": 0,
                "nutrientId": 5
            },
            {
                "value": 0,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 0.08,
                "nutrientId": 8
            },
            {
                "value": 0,
                "nutrientId": 9
            },
            {
                "value": 1.5,
                "nutrientId": 10
            },
            {
                "value": 0,
                "nutrientId": 11
            },
            {
                "value": 1795,
                "nutrientId": 12
            },
            {
                "value": 3957,
                "nutrientId": 13
            },
            {
                "value": 16.56,
                "nutrientId": 14
            },
            {
                "value": 54,
                "nutrientId": 15
            },
            {
                "value": 3150,
                "nutrientId": 16
            },
            {
                "value": 0.92,
                "nutrientId": 17
            },
            {
                "value": 0.79,
                "nutrientId": 18
            },
            {
                "value": 0.35,
                "nutrientId": 19
            },
            {
                "value": 0.3,
                "nutrientId": 20
            },
            {
                "value": 0.42,
                "nutrientId": 21
            },
            {
                "value": 0.3,
                "nutrientId": 22
            },
            {
                "value": 0.77,
                "nutrientId": 23
            },
            {
                "value": 0.62,
                "nutrientId": 24
            },
            {
                "value": 0.22,
                "nutrientId": 25
            },
            {
                "value": 0.17,
                "nutrientId": 26
            },
            {
                "value": 2.05,
                "nutrientId": 27
            },
            {
                "value": 1.68,
                "nutrientId": 28
            },
            {
                "value": 0.95,
                "nutrientId": 29
            },
            {
                "value": 0.81,
                "nutrientId": 30
            },
            {
                "value": 1.17,
                "nutrientId": 31
            },
            {
                "value": 0.97,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "16",
        "name": "L-Lysine",
        "description": "Essential amino acid typically first-limiting in swine and poultry diets. Critical for muscle protein synthesis and overall growth. Supplementation allows reduction of crude protein in feeds while maintaining performance.",
        "key_benefits": [
            "Improves protein utilization",
            "Reduces feed costs",
            "Decreases nitrogen excretion",
            "Supports immune function"
        ],
        "applications": [
            "Swine",
            "Poultry",
            "Aquaculture",
            "Pet food"
        ],
        "categoryId": 6,
        "compositions": [
            {
                "value": 99,
                "nutrientId": 1
            },
            {
                "value": 93.4,
                "nutrientId": 2
            },
            {
                "value": 0,
                "nutrientId": 3
            },
            {
                "value": 0,
                "nutrientId": 4
            },
            {
                "value": 0,
                "nutrientId": 5
            },
            {
                "value": 0,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 0,
                "nutrientId": 8
            },
            {
                "value": 0,
                "nutrientId": 9
            },
            {
                "value": 0,
                "nutrientId": 10
            },
            {
                "value": 0,
                "nutrientId": 11
            },
            {
                "value": 1868,
                "nutrientId": 12
            },
            {
                "value": 4120,
                "nutrientId": 13
            },
            {
                "value": 17.24,
                "nutrientId": 14
            },
            {
                "value": 0,
                "nutrientId": 15
            },
            {
                "value": 0,
                "nutrientId": 16
            },
            {
                "value": 78.8,
                "nutrientId": 17
            },
            {
                "value": 78.8,
                "nutrientId": 18
            },
            {
                "value": 0,
                "nutrientId": 19
            },
            {
                "value": 0,
                "nutrientId": 20
            },
            {
                "value": 0,
                "nutrientId": 21
            },
            {
                "value": 0,
                "nutrientId": 22
            },
            {
                "value": 0,
                "nutrientId": 23
            },
            {
                "value": 0,
                "nutrientId": 24
            },
            {
                "value": 0,
                "nutrientId": 25
            },
            {
                "value": 0,
                "nutrientId": 26
            },
            {
                "value": 0,
                "nutrientId": 27
            },
            {
                "value": 0,
                "nutrientId": 28
            },
            {
                "value": 0,
                "nutrientId": 29
            },
            {
                "value": 0,
                "nutrientId": 30
            },
            {
                "value": 0,
                "nutrientId": 31
            },
            {
                "value": 0,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "17",
        "name": "L-Threonine",
        "description": "Third-limiting amino acid in poultry diets, essential for protein synthesis and gut health. Particularly important for mucin production in intestinal lining. Modern feed formulations increasingly include threonine for precision nutrition.",
        "key_benefits": [
            "Supports gut health",
            "Improves protein efficiency",
            "Reduces dietary protein needs",
            "Essential for young animals"
        ],
        "applications": [
            "Swine",
            "Poultry",
            "Aquaculture",
            "Pet food"
        ],
        "categoryId": 6,
        "compositions": [
            {
                "value": 99,
                "nutrientId": 1
            },
            {
                "value": 72.4,
                "nutrientId": 2
            },
            {
                "value": 0,
                "nutrientId": 3
            },
            {
                "value": 0,
                "nutrientId": 4
            },
            {
                "value": 0,
                "nutrientId": 5
            },
            {
                "value": 0,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 0,
                "nutrientId": 8
            },
            {
                "value": 0,
                "nutrientId": 9
            },
            {
                "value": 0,
                "nutrientId": 10
            },
            {
                "value": 0,
                "nutrientId": 11
            },
            {
                "value": 1619,
                "nutrientId": 12
            },
            {
                "value": 3570,
                "nutrientId": 13
            },
            {
                "value": 14.94,
                "nutrientId": 14
            },
            {
                "value": 0,
                "nutrientId": 15
            },
            {
                "value": 0,
                "nutrientId": 16
            },
            {
                "value": 0,
                "nutrientId": 17
            },
            {
                "value": 0,
                "nutrientId": 18
            },
            {
                "value": 0,
                "nutrientId": 19
            },
            {
                "value": 0,
                "nutrientId": 20
            },
            {
                "value": 0,
                "nutrientId": 21
            },
            {
                "value": 0,
                "nutrientId": 22
            },
            {
                "value": 98.5,
                "nutrientId": 23
            },
            {
                "value": 98.5,
                "nutrientId": 24
            },
            {
                "value": 0,
                "nutrientId": 25
            },
            {
                "value": 0,
                "nutrientId": 26
            },
            {
                "value": 0,
                "nutrientId": 27
            },
            {
                "value": 0,
                "nutrientId": 28
            },
            {
                "value": 0,
                "nutrientId": 29
            },
            {
                "value": 0,
                "nutrientId": 30
            },
            {
                "value": 0,
                "nutrientId": 31
            },
            {
                "value": 0,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "18",
        "name": "L-Tryptophan",
        "description": "Essential amino acid that serves as precursor for serotonin and niacin. Important for appetite regulation and stress reduction. Typically fourth-limiting amino acid in swine diets, with increasing use in poultry nutrition.",
        "key_benefits": [
            "Reduces stress behaviors",
            "Improves feed intake",
            "Precursor to serotonin",
            "Allows lower protein diets"
        ],
        "applications": [
            "Swine",
            "Poultry",
            "Pet food"
        ],
        "categoryId": 6,
        "compositions": [
            {
                "value": 99,
                "nutrientId": 1
            },
            {
                "value": 84,
                "nutrientId": 2
            },
            {
                "value": 0,
                "nutrientId": 3
            },
            {
                "value": 0,
                "nutrientId": 4
            },
            {
                "value": 0,
                "nutrientId": 5
            },
            {
                "value": 0,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 0,
                "nutrientId": 8
            },
            {
                "value": 0,
                "nutrientId": 9
            },
            {
                "value": 0,
                "nutrientId": 10
            },
            {
                "value": 0,
                "nutrientId": 11
            },
            {
                "value": 2653,
                "nutrientId": 12
            },
            {
                "value": 5850,
                "nutrientId": 13
            },
            {
                "value": 24.48,
                "nutrientId": 14
            },
            {
                "value": 0,
                "nutrientId": 15
            },
            {
                "value": 0,
                "nutrientId": 16
            },
            {
                "value": 0,
                "nutrientId": 17
            },
            {
                "value": 0,
                "nutrientId": 18
            },
            {
                "value": 0,
                "nutrientId": 19
            },
            {
                "value": 0,
                "nutrientId": 20
            },
            {
                "value": 0,
                "nutrientId": 21
            },
            {
                "value": 0,
                "nutrientId": 22
            },
            {
                "value": 0,
                "nutrientId": 23
            },
            {
                "value": 0,
                "nutrientId": 24
            },
            {
                "value": 98,
                "nutrientId": 25
            },
            {
                "value": 98,
                "nutrientId": 26
            },
            {
                "value": 0,
                "nutrientId": 27
            },
            {
                "value": 0,
                "nutrientId": 28
            },
            {
                "value": 0,
                "nutrientId": 29
            },
            {
                "value": 0,
                "nutrientId": 30
            },
            {
                "value": 0,
                "nutrientId": 31
            },
            {
                "value": 0,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "19",
        "name": "Linseed meal flax, expeller",
        "description": "Byproduct of mechanical flaxseed oil extraction, retaining some omega-3 fatty acids and high-quality protein. Contains natural antioxidants (lignans) and soluble fiber that benefits digestive health. Mild laxative properties.",
        "key_benefits": [
            "Residual omega-3 content",
            "Good protein source (34-36%)",
            "Natural antioxidants",
            "Supports digestive health"
        ],
        "applications": [
            "Dairy cattle",
            "Horses",
            "Poultry",
            "Swine",
            "Pet food"
        ],
        "categoryId": 3,
        "compositions": [
            {
                "value": 90,
                "nutrientId": 1
            },
            {
                "value": 32,
                "nutrientId": 2
            },
            {
                "value": 3.5,
                "nutrientId": 3
            },
            {
                "value": 9.5,
                "nutrientId": 4
            },
            {
                "value": 0.4,
                "nutrientId": 5
            },
            {
                "value": 0.8,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 0.11,
                "nutrientId": 8
            },
            {
                "value": 0,
                "nutrientId": 9
            },
            {
                "value": 1.24,
                "nutrientId": 10
            },
            {
                "value": 0.39,
                "nutrientId": 11
            },
            {
                "value": 700,
                "nutrientId": 12
            },
            {
                "value": 1540,
                "nutrientId": 13
            },
            {
                "value": 6.44,
                "nutrientId": 14
            },
            {
                "value": 0.5,
                "nutrientId": 15
            },
            {
                "value": 672,
                "nutrientId": 16
            },
            {
                "value": 1.1,
                "nutrientId": 17
            },
            {
                "value": 0.99,
                "nutrientId": 18
            },
            {
                "value": 0.47,
                "nutrientId": 19
            },
            {
                "value": 0.37,
                "nutrientId": 20
            },
            {
                "value": 0.56,
                "nutrientId": 21
            },
            {
                "value": 0.44,
                "nutrientId": 22
            },
            {
                "value": 1.1,
                "nutrientId": 23
            },
            {
                "value": 1,
                "nutrientId": 24
            },
            {
                "value": 0.47,
                "nutrientId": 25
            },
            {
                "value": 0.43,
                "nutrientId": 26
            },
            {
                "value": 2.6,
                "nutrientId": 27
            },
            {
                "value": 2.39,
                "nutrientId": 28
            },
            {
                "value": 1.7,
                "nutrientId": 29
            },
            {
                "value": 1.49,
                "nutrientId": 30
            },
            {
                "value": 1.5,
                "nutrientId": 31
            },
            {
                "value": 1.29,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "20",
        "name": "Linseed meal flax, solvent",
        "description": "Defatted flaxseed meal with concentrated protein content from solvent extraction. Lower in oil than expeller meal but more consistent in protein quality. Valuable for its amino acid profile and functional fiber content.",
        "key_benefits": [
            "Higher protein concentration",
            "More consistent quality",
            "Good amino acid balance",
            "Contains beneficial fiber"
        ],
        "applications": [
            "Dairy cattle",
            "Horses",
            "Poultry",
            "Swine",
            "Pet food"
        ],
        "categoryId": 3,
        "compositions": [
            {
                "value": 88,
                "nutrientId": 1
            },
            {
                "value": 33,
                "nutrientId": 2
            },
            {
                "value": 0.5,
                "nutrientId": 3
            },
            {
                "value": 9.5,
                "nutrientId": 4
            },
            {
                "value": 0.35,
                "nutrientId": 5
            },
            {
                "value": 0.75,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 0.14,
                "nutrientId": 8
            },
            {
                "value": 0,
                "nutrientId": 9
            },
            {
                "value": 1.38,
                "nutrientId": 10
            },
            {
                "value": 0.39,
                "nutrientId": 11
            },
            {
                "value": 635,
                "nutrientId": 12
            },
            {
                "value": 1400,
                "nutrientId": 13
            },
            {
                "value": 5.86,
                "nutrientId": 14
            },
            {
                "value": 0.1,
                "nutrientId": 15
            },
            {
                "value": 1760,
                "nutrientId": 16
            },
            {
                "value": 1.1,
                "nutrientId": 17
            },
            {
                "value": 0.99,
                "nutrientId": 18
            },
            {
                "value": 0.48,
                "nutrientId": 19
            },
            {
                "value": 0.38,
                "nutrientId": 20
            },
            {
                "value": 0.58,
                "nutrientId": 21
            },
            {
                "value": 0.45,
                "nutrientId": 22
            },
            {
                "value": 1.2,
                "nutrientId": 23
            },
            {
                "value": 1.1,
                "nutrientId": 24
            },
            {
                "value": 0.48,
                "nutrientId": 25
            },
            {
                "value": 0.44,
                "nutrientId": 26
            },
            {
                "value": 2.7,
                "nutrientId": 27
            },
            {
                "value": 2.48,
                "nutrientId": 28
            },
            {
                "value": 1.8,
                "nutrientId": 29
            },
            {
                "value": 1.58,
                "nutrientId": 30
            },
            {
                "value": 1.6,
                "nutrientId": 31
            },
            {
                "value": 1.38,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "21",
        "name": "Meat and bone meal, 50%",
        "description": "Recycled protein source from rendered animal tissues, providing both high-quality protein and natural minerals. Excellent calcium and phosphorus content. Must be properly processed to ensure safety and palatability.",
        "key_benefits": [
            "50% high-quality protein",
            "Natural mineral source",
            "Good amino acid profile",
            "Sustainable ingredient"
        ],
        "applications": [
            "Poultry",
            "Swine",
            "Pet food",
            "Aquaculture"
        ],
        "categoryId": 4,
        "compositions": [
            {
                "value": 93,
                "nutrientId": 1
            },
            {
                "value": 50,
                "nutrientId": 2
            },
            {
                "value": 8.5,
                "nutrientId": 3
            },
            {
                "value": 2.8,
                "nutrientId": 4
            },
            {
                "value": 9.2,
                "nutrientId": 5
            },
            {
                "value": 4.7,
                "nutrientId": 6
            },
            {
                "value": 4.7,
                "nutrientId": 7
            },
            {
                "value": 0.8,
                "nutrientId": 8
            },
            {
                "value": 0.75,
                "nutrientId": 9
            },
            {
                "value": 1.4,
                "nutrientId": 10
            },
            {
                "value": 0.4,
                "nutrientId": 11
            },
            {
                "value": 1150,
                "nutrientId": 12
            },
            {
                "value": 2530,
                "nutrientId": 13
            },
            {
                "value": 10.59,
                "nutrientId": 14
            },
            {
                "value": 0.5,
                "nutrientId": 15
            },
            {
                "value": 2000,
                "nutrientId": 16
            },
            {
                "value": 2.6,
                "nutrientId": 17
            },
            {
                "value": 2.05,
                "nutrientId": 18
            },
            {
                "value": 0.67,
                "nutrientId": 19
            },
            {
                "value": 0.57,
                "nutrientId": 20
            },
            {
                "value": 0.33,
                "nutrientId": 21
            },
            {
                "value": 0.19,
                "nutrientId": 22
            },
            {
                "value": 1.7,
                "nutrientId": 23
            },
            {
                "value": 1.34,
                "nutrientId": 24
            },
            {
                "value": 0.26,
                "nutrientId": 25
            },
            {
                "value": 0.13,
                "nutrientId": 26
            },
            {
                "value": 3.35,
                "nutrientId": 27
            },
            {
                "value": 2.85,
                "nutrientId": 28
            },
            {
                "value": 1.7,
                "nutrientId": 29
            },
            {
                "value": 1.41,
                "nutrientId": 30
            },
            {
                "value": 2.25,
                "nutrientId": 31
            },
            {
                "value": 1.85,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "22",
        "name": "Millet, pearl grain",
        "description": "Drought-resistant small grain with nutritional profile similar to corn but higher in protein and some minerals. Gluten-free and easily digestible. Particularly valuable in hot climates where other grains don't thrive.",
        "key_benefits": [
            "Drought-resistant crop",
            "Higher protein than corn",
            "Gluten-free",
            "Good amino acid balance"
        ],
        "applications": [
            "Poultry",
            "Swine",
            "Dairy cattle",
            "Beef cattle",
            "Sheep",
            "Goats"
        ],
        "categoryId": 1,
        "compositions": [
            {
                "value": 90,
                "nutrientId": 1
            },
            {
                "value": 12,
                "nutrientId": 2
            },
            {
                "value": 4.2,
                "nutrientId": 3
            },
            {
                "value": 1.8,
                "nutrientId": 4
            },
            {
                "value": 0.05,
                "nutrientId": 5
            },
            {
                "value": 0.3,
                "nutrientId": 6
            },
            {
                "value": 0.1,
                "nutrientId": 7
            },
            {
                "value": 0.04,
                "nutrientId": 8
            },
            {
                "value": 0.64,
                "nutrientId": 9
            },
            {
                "value": 0.43,
                "nutrientId": 10
            },
            {
                "value": 0.13,
                "nutrientId": 11
            },
            {
                "value": 1470,
                "nutrientId": 12
            },
            {
                "value": 3240,
                "nutrientId": 13
            },
            {
                "value": 13.56,
                "nutrientId": 14
            },
            {
                "value": 1.3,
                "nutrientId": 15
            },
            {
                "value": 789,
                "nutrientId": 16
            },
            {
                "value": 0.35,
                "nutrientId": 17
            },
            {
                "value": 0.32,
                "nutrientId": 18
            },
            {
                "value": 0.28,
                "nutrientId": 19
            },
            {
                "value": 0.25,
                "nutrientId": 20
            },
            {
                "value": 0.24,
                "nutrientId": 21
            },
            {
                "value": 0.2,
                "nutrientId": 22
            },
            {
                "value": 0.44,
                "nutrientId": 23
            },
            {
                "value": 0.37,
                "nutrientId": 24
            },
            {
                "value": 0.2,
                "nutrientId": 25
            },
            {
                "value": 0.18,
                "nutrientId": 26
            },
            {
                "value": 0.55,
                "nutrientId": 27
            },
            {
                "value": 0.49,
                "nutrientId": 28
            },
            {
                "value": 0.52,
                "nutrientId": 29
            },
            {
                "value": 0.46,
                "nutrientId": 30
            },
            {
                "value": 0.7,
                "nutrientId": 31
            },
            {
                "value": 0.62,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "23",
        "name": "Mono-dicalcium phosphate (21% P)",
        "description": "Highly bioavailable phosphorus source with optimal calcium content. Critical for bone development, energy metabolism and cellular functions. Purified form ensures consistent quality and avoids contaminants found in natural phosphates.",
        "key_benefits": [
            "21% available phosphorus",
            "Highly digestible",
            "Consistent quality",
            "Optimal Ca:P ratio"
        ],
        "applications": [
            "All livestock",
            "Poultry",
            "Swine",
            "Dairy cattle",
            "Aquaculture"
        ],
        "categoryId": 5,
        "compositions": [
            {
                "value": 99,
                "nutrientId": 1
            },
            {
                "value": 0,
                "nutrientId": 2
            },
            {
                "value": 0,
                "nutrientId": 3
            },
            {
                "value": 0,
                "nutrientId": 4
            },
            {
                "value": 16,
                "nutrientId": 5
            },
            {
                "value": 21,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 0.05,
                "nutrientId": 8
            },
            {
                "value": 0,
                "nutrientId": 9
            },
            {
                "value": 0.06,
                "nutrientId": 10
            },
            {
                "value": 0,
                "nutrientId": 11
            },
            {
                "value": 0,
                "nutrientId": 12
            },
            {
                "value": 0,
                "nutrientId": 13
            },
            {
                "value": 0,
                "nutrientId": 14
            },
            {
                "value": 0,
                "nutrientId": 15
            },
            {
                "value": 0,
                "nutrientId": 16
            },
            {
                "value": 0,
                "nutrientId": 17
            },
            {
                "value": 0,
                "nutrientId": 18
            },
            {
                "value": 0,
                "nutrientId": 19
            },
            {
                "value": 0,
                "nutrientId": 20
            },
            {
                "value": 0,
                "nutrientId": 21
            },
            {
                "value": 0,
                "nutrientId": 22
            },
            {
                "value": 0,
                "nutrientId": 23
            },
            {
                "value": 0,
                "nutrientId": 24
            },
            {
                "value": 0,
                "nutrientId": 25
            },
            {
                "value": 0,
                "nutrientId": 26
            },
            {
                "value": 0,
                "nutrientId": 27
            },
            {
                "value": 0,
                "nutrientId": 28
            },
            {
                "value": 0,
                "nutrientId": 29
            },
            {
                "value": 0,
                "nutrientId": 30
            },
            {
                "value": 0,
                "nutrientId": 31
            },
            {
                "value": 0,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "24",
        "name": "Oats, grain",
        "description": "Nutritious cereal grain with higher protein and fat content than corn or wheat. The high fiber content (especially beta-glucans) supports digestive health. Hulled varieties provide better energy density for livestock feeds.",
        "key_benefits": [
            "Higher protein than corn",
            "Good fat content (5-6%)",
            "Digestive health support",
            "Excellent palatability"
        ],
        "applications": [
            "Horses",
            "Dairy cattle",
            "Beef cattle",
            "Sheep",
            "Goats",
            "Poultry"
        ],
        "categoryId": 1,
        "compositions": [
            {
                "value": 90,
                "nutrientId": 1
            },
            {
                "value": 11,
                "nutrientId": 2
            },
            {
                "value": 4,
                "nutrientId": 3
            },
            {
                "value": 10.5,
                "nutrientId": 4
            },
            {
                "value": 0.1,
                "nutrientId": 5
            },
            {
                "value": 0.35,
                "nutrientId": 6
            },
            {
                "value": 0.14,
                "nutrientId": 7
            },
            {
                "value": 0.07,
                "nutrientId": 8
            },
            {
                "value": 0.12,
                "nutrientId": 9
            },
            {
                "value": 0.37,
                "nutrientId": 10
            },
            {
                "value": 0.21,
                "nutrientId": 11
            },
            {
                "value": 1160,
                "nutrientId": 12
            },
            {
                "value": 2550,
                "nutrientId": 13
            },
            {
                "value": 10.67,
                "nutrientId": 14
            },
            {
                "value": 2.4,
                "nutrientId": 15
            },
            {
                "value": 1070,
                "nutrientId": 16
            },
            {
                "value": 0.4,
                "nutrientId": 17
            },
            {
                "value": 0.35,
                "nutrientId": 18
            },
            {
                "value": 0.2,
                "nutrientId": 19
            },
            {
                "value": 0.17,
                "nutrientId": 20
            },
            {
                "value": 0.21,
                "nutrientId": 21
            },
            {
                "value": 0.18,
                "nutrientId": 22
            },
            {
                "value": 0.28,
                "nutrientId": 23
            },
            {
                "value": 0.24,
                "nutrientId": 24
            },
            {
                "value": 0.18,
                "nutrientId": 25
            },
            {
                "value": 0.14,
                "nutrientId": 26
            },
            {
                "value": 0.8,
                "nutrientId": 27
            },
            {
                "value": 0.75,
                "nutrientId": 28
            },
            {
                "value": 0.53,
                "nutrientId": 29
            },
            {
                "value": 0.47,
                "nutrientId": 30
            },
            {
                "value": 0.62,
                "nutrientId": 31
            },
            {
                "value": 0.55,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "25",
        "name": "Peanut meal, solvent",
        "description": "High-protein byproduct from peanut oil extraction, with good amino acid profile though slightly deficient in lysine and methionine. Must be properly stored to prevent aflatoxin contamination. Valuable in ruminant and swine diets.",
        "key_benefits": [
            "45-50% protein",
            "Good energy content",
            "Highly palatable",
            "Cost-effective"
        ],
        "applications": [
            "Dairy cattle",
            "Beef cattle",
            "Swine",
            "Poultry",
            "Sheep",
            "Goats"
        ],
        "categoryId": 3,
        "compositions": [
            {
                "value": 90,
                "nutrientId": 1
            },
            {
                "value": 47,
                "nutrientId": 2
            },
            {
                "value": 2.5,
                "nutrientId": 3
            },
            {
                "value": 8.4,
                "nutrientId": 4
            },
            {
                "value": 0.08,
                "nutrientId": 5
            },
            {
                "value": 0.57,
                "nutrientId": 6
            },
            {
                "value": 0.18,
                "nutrientId": 7
            },
            {
                "value": 0.07,
                "nutrientId": 8
            },
            {
                "value": 0.03,
                "nutrientId": 9
            },
            {
                "value": 1.22,
                "nutrientId": 10
            },
            {
                "value": 0.3,
                "nutrientId": 11
            },
            {
                "value": 1217,
                "nutrientId": 12
            },
            {
                "value": 2677,
                "nutrientId": 13
            },
            {
                "value": 11.2,
                "nutrientId": 14
            },
            {
                "value": 0.5,
                "nutrientId": 15
            },
            {
                "value": 1948,
                "nutrientId": 16
            },
            {
                "value": 1.52,
                "nutrientId": 17
            },
            {
                "value": 1.29,
                "nutrientId": 18
            },
            {
                "value": 0.5,
                "nutrientId": 19
            },
            {
                "value": 0.44,
                "nutrientId": 20
            },
            {
                "value": 0.6,
                "nutrientId": 21
            },
            {
                "value": 0.47,
                "nutrientId": 22
            },
            {
                "value": 1.12,
                "nutrientId": 23
            },
            {
                "value": 0.91,
                "nutrientId": 24
            },
            {
                "value": 0.42,
                "nutrientId": 25
            },
            {
                "value": 0.39,
                "nutrientId": 26
            },
            {
                "value": 4.76,
                "nutrientId": 27
            },
            {
                "value": 4.28,
                "nutrientId": 28
            },
            {
                "value": 1.5,
                "nutrientId": 29
            },
            {
                "value": 1.32,
                "nutrientId": 30
            },
            {
                "value": 1.8,
                "nutrientId": 31
            },
            {
                "value": 1.57,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "26",
        "name": "Poultry byproduct meal (feed grade)",
        "description": "Concentrated protein source made from rendered poultry parts (necks, undeveloped eggs, intestines). Exceptionally high in essential amino acids and available phosphorus. Heat-processed to ensure safety and digestibility.",
        "key_benefits": [
            "58-65% protein",
            "Excellent amino acid profile",
            "High available phosphorus",
            "Sustainable ingredient"
        ],
        "applications": [
            "Poultry",
            "Swine",
            "Pet food",
            "Aquaculture"
        ],
        "categoryId": 4,
        "compositions": [
            {
                "value": 94,
                "nutrientId": 1
            },
            {
                "value": 57,
                "nutrientId": 2
            },
            {
                "value": 14,
                "nutrientId": 3
            },
            {
                "value": 2.5,
                "nutrientId": 4
            },
            {
                "value": 5,
                "nutrientId": 5
            },
            {
                "value": 2.7,
                "nutrientId": 6
            },
            {
                "value": 2.7,
                "nutrientId": 7
            },
            {
                "value": 0.3,
                "nutrientId": 8
            },
            {
                "value": 0.55,
                "nutrientId": 9
            },
            {
                "value": 0.6,
                "nutrientId": 10
            },
            {
                "value": 0.5,
                "nutrientId": 11
            },
            {
                "value": 1406,
                "nutrientId": 12
            },
            {
                "value": 3100,
                "nutrientId": 13
            },
            {
                "value": 12.97,
                "nutrientId": 14
            },
            {
                "value": 0.7,
                "nutrientId": 15
            },
            {
                "value": 5980,
                "nutrientId": 16
            },
            {
                "value": 2.25,
                "nutrientId": 17
            },
            {
                "value": 1.8,
                "nutrientId": 18
            },
            {
                "value": 0.91,
                "nutrientId": 19
            },
            {
                "value": 0.78,
                "nutrientId": 20
            },
            {
                "value": 0.9,
                "nutrientId": 21
            },
            {
                "value": 0.55,
                "nutrientId": 22
            },
            {
                "value": 1.88,
                "nutrientId": 23
            },
            {
                "value": 1.5,
                "nutrientId": 24
            },
            {
                "value": 0.5,
                "nutrientId": 25
            },
            {
                "value": 0.26,
                "nutrientId": 26
            },
            {
                "value": 3.5,
                "nutrientId": 27
            },
            {
                "value": 3.08,
                "nutrientId": 28
            },
            {
                "value": 2.1,
                "nutrientId": 29
            },
            {
                "value": 1.79,
                "nutrientId": 30
            },
            {
                "value": 2.32,
                "nutrientId": 31
            },
            {
                "value": 1.93,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "27",
        "name": "Rice bran, unextracted",
        "description": "Nutrient-dense milling byproduct containing 12-18% oil along with protein, fiber and B-vitamins. The oil provides energy and essential fatty acids but requires stabilization to prevent rancidity. Particularly popular in aquaculture feeds.",
        "key_benefits": [
            "Balanced nutrition",
            "Natural vitamin E source",
            "Good energy content",
            "Functional fiber"
        ],
        "applications": [
            "Dairy cattle",
            "Beef cattle",
            "Swine",
            "Poultry",
            "Horses"
        ],
        "categoryId": 8,
        "compositions": [
            {
                "value": 91,
                "nutrientId": 1
            },
            {
                "value": 13.5,
                "nutrientId": 2
            },
            {
                "value": 5.9,
                "nutrientId": 3
            },
            {
                "value": 13,
                "nutrientId": 4
            },
            {
                "value": 0.1,
                "nutrientId": 5
            },
            {
                "value": 1.7,
                "nutrientId": 6
            },
            {
                "value": 0.24,
                "nutrientId": 7
            },
            {
                "value": 0.1,
                "nutrientId": 8
            },
            {
                "value": 0.07,
                "nutrientId": 9
            },
            {
                "value": 1.35,
                "nutrientId": 10
            },
            {
                "value": 0.18,
                "nutrientId": 11
            },
            {
                "value": 925,
                "nutrientId": 12
            },
            {
                "value": 2040,
                "nutrientId": 13
            },
            {
                "value": 8.54,
                "nutrientId": 14
            },
            {
                "value": 5.2,
                "nutrientId": 15
            },
            {
                "value": 1948,
                "nutrientId": 16
            },
            {
                "value": 0.5,
                "nutrientId": 17
            },
            {
                "value": 0.38,
                "nutrientId": 18
            },
            {
                "value": 0.17,
                "nutrientId": 19
            },
            {
                "value": 0.13,
                "nutrientId": 20
            },
            {
                "value": 0.1,
                "nutrientId": 21
            },
            {
                "value": 0.07,
                "nutrientId": 22
            },
            {
                "value": 0.4,
                "nutrientId": 23
            },
            {
                "value": 0.28,
                "nutrientId": 24
            },
            {
                "value": 0.1,
                "nutrientId": 25
            },
            {
                "value": 0.08,
                "nutrientId": 26
            },
            {
                "value": 0.45,
                "nutrientId": 27
            },
            {
                "value": 0.39,
                "nutrientId": 28
            },
            {
                "value": 0.39,
                "nutrientId": 29
            },
            {
                "value": 0.3,
                "nutrientId": 30
            },
            {
                "value": 0.6,
                "nutrientId": 31
            },
            {
                "value": 0.46,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "28",
        "name": "Rice, grain, rough",
        "description": "Whole rice grain including hull, providing moderate energy with higher fiber content than polished rice. The hull provides bulk and supports rumen function in cattle. Often used as cost-effective partial replacement for corn.",
        "key_benefits": [
            "Lower cost than corn",
            "Good energy content",
            "Hull aids rumen function",
            "Gluten-free"
        ],
        "applications": [
            "Dairy cattle",
            "Beef cattle",
            "Swine",
            "Poultry",
            "Sheep",
            "Goats"
        ],
        "categoryId": 1,
        "compositions": [
            {
                "value": 89,
                "nutrientId": 1
            },
            {
                "value": 7.3,
                "nutrientId": 2
            },
            {
                "value": 1.7,
                "nutrientId": 3
            },
            {
                "value": 10,
                "nutrientId": 4
            },
            {
                "value": 0.04,
                "nutrientId": 5
            },
            {
                "value": 0.26,
                "nutrientId": 6
            },
            {
                "value": 0.09,
                "nutrientId": 7
            },
            {
                "value": 0.04,
                "nutrientId": 8
            },
            {
                "value": 0.06,
                "nutrientId": 9
            },
            {
                "value": 0.34,
                "nutrientId": 10
            },
            {
                "value": 0.1,
                "nutrientId": 11
            },
            {
                "value": 1335,
                "nutrientId": 12
            },
            {
                "value": 2940,
                "nutrientId": 13
            },
            {
                "value": 12.3,
                "nutrientId": 14
            },
            {
                "value": 0.83,
                "nutrientId": 15
            },
            {
                "value": 5980,
                "nutrientId": 16
            },
            {
                "value": 0.24,
                "nutrientId": 17
            },
            {
                "value": 0.19,
                "nutrientId": 18
            },
            {
                "value": 0.14,
                "nutrientId": 19
            },
            {
                "value": 0.13,
                "nutrientId": 20
            },
            {
                "value": 0.08,
                "nutrientId": 21
            },
            {
                "value": 0.07,
                "nutrientId": 22
            },
            {
                "value": 0.27,
                "nutrientId": 23
            },
            {
                "value": 0.22,
                "nutrientId": 24
            },
            {
                "value": 0.12,
                "nutrientId": 25
            },
            {
                "value": 0.11,
                "nutrientId": 26
            },
            {
                "value": 0.59,
                "nutrientId": 27
            },
            {
                "value": 0.54,
                "nutrientId": 28
            },
            {
                "value": 0.33,
                "nutrientId": 29
            },
            {
                "value": 0.27,
                "nutrientId": 30
            },
            {
                "value": 0.46,
                "nutrientId": 31
            },
            {
                "value": 0.39,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "29",
        "name": "Safflower seed meal, expeller",
        "description": "Plant protein supplement remaining after mechanical oil extraction from safflower seeds. Higher in fiber than soybean meal but with good protein content. Particularly useful in ruminant diets where extra fiber is beneficial.",
        "key_benefits": [
            "24-28% protein",
            "Good fiber source",
            "Residual oil content",
            "Rumen-friendly"
        ],
        "applications": [
            "Dairy cattle",
            "Beef cattle",
            "Sheep",
            "Goats"
        ],
        "categoryId": 3,
        "compositions": [
            {
                "value": 91,
                "nutrientId": 1
            },
            {
                "value": 20,
                "nutrientId": 2
            },
            {
                "value": 6.6,
                "nutrientId": 3
            },
            {
                "value": 32.2,
                "nutrientId": 4
            },
            {
                "value": 0.23,
                "nutrientId": 5
            },
            {
                "value": 0.61,
                "nutrientId": 6
            },
            {
                "value": 0.2,
                "nutrientId": 7
            },
            {
                "value": 0.05,
                "nutrientId": 8
            },
            {
                "value": 0.16,
                "nutrientId": 9
            },
            {
                "value": 0.72,
                "nutrientId": 10
            },
            {
                "value": 0.1,
                "nutrientId": 11
            },
            {
                "value": 525,
                "nutrientId": 12
            },
            {
                "value": 1160,
                "nutrientId": 13
            },
            {
                "value": 4.85,
                "nutrientId": 14
            },
            {
                "value": 0,
                "nutrientId": 15
            },
            {
                "value": 800,
                "nutrientId": 16
            },
            {
                "value": 0.7,
                "nutrientId": 17
            },
            {
                "value": 0.58,
                "nutrientId": 18
            },
            {
                "value": 0.4,
                "nutrientId": 19
            },
            {
                "value": 0.35,
                "nutrientId": 20
            },
            {
                "value": 0.58,
                "nutrientId": 21
            },
            {
                "value": 0.45,
                "nutrientId": 22
            },
            {
                "value": 0.47,
                "nutrientId": 23
            },
            {
                "value": 0.34,
                "nutrientId": 24
            },
            {
                "value": 0.3,
                "nutrientId": 25
            },
            {
                "value": 0.24,
                "nutrientId": 26
            },
            {
                "value": 1.2,
                "nutrientId": 27
            },
            {
                "value": 1.01,
                "nutrientId": 28
            },
            {
                "value": 0.28,
                "nutrientId": 29
            },
            {
                "value": 0.22,
                "nutrientId": 30
            },
            {
                "value": 1,
                "nutrientId": 31
            },
            {
                "value": 0.87,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "30",
        "name": "Salt, NaCl",
        "description": "Essential nutrient for all animals, critical for maintaining fluid balance, nerve transmission and nutrient absorption. Often used as carrier for trace minerals. Both iodized and plain versions available for different applications.",
        "key_benefits": [
            "Electrolyte balance",
            "Stimulates water intake",
            "Carrier for trace minerals",
            "Supports nutrient absorption"
        ],
        "applications": [
            "All livestock",
            "Poultry",
            "Swine",
            "Dairy cattle",
            "Aquaculture"
        ],
        "categoryId": 5,
        "compositions": [
            {
                "value": 99,
                "nutrientId": 1
            },
            {
                "value": 0,
                "nutrientId": 2
            },
            {
                "value": 0,
                "nutrientId": 3
            },
            {
                "value": 0,
                "nutrientId": 4
            },
            {
                "value": 0,
                "nutrientId": 5
            },
            {
                "value": 0,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 39.34,
                "nutrientId": 8
            },
            {
                "value": 60.66,
                "nutrientId": 9
            },
            {
                "value": 0,
                "nutrientId": 10
            },
            {
                "value": 0,
                "nutrientId": 11
            },
            {
                "value": 0,
                "nutrientId": 12
            },
            {
                "value": 0,
                "nutrientId": 13
            },
            {
                "value": 0,
                "nutrientId": 14
            },
            {
                "value": 0,
                "nutrientId": 15
            },
            {
                "value": 0,
                "nutrientId": 16
            },
            {
                "value": 0,
                "nutrientId": 17
            },
            {
                "value": 0,
                "nutrientId": 18
            },
            {
                "value": 0,
                "nutrientId": 19
            },
            {
                "value": 0,
                "nutrientId": 20
            },
            {
                "value": 0,
                "nutrientId": 21
            },
            {
                "value": 0,
                "nutrientId": 22
            },
            {
                "value": 0,
                "nutrientId": 23
            },
            {
                "value": 0,
                "nutrientId": 24
            },
            {
                "value": 0,
                "nutrientId": 25
            },
            {
                "value": 0,
                "nutrientId": 26
            },
            {
                "value": 0,
                "nutrientId": 27
            },
            {
                "value": 0,
                "nutrientId": 28
            },
            {
                "value": 0,
                "nutrientId": 29
            },
            {
                "value": 0,
                "nutrientId": 30
            },
            {
                "value": 0,
                "nutrientId": 31
            },
            {
                "value": 0,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "31",
        "name": "Sodium bicarbonate, NaHCO3",
        "description": "Important buffer that helps maintain proper rumen pH in cattle and digestive tract pH in poultry. Particularly valuable in high-concentrate diets. Also provides bioavailable sodium for metabolic functions.",
        "key_benefits": [
            "Rumen pH stabilization",
            "Reduces acidosis risk",
            "Sodium supplement",
            "Improves feed efficiency"
        ],
        "applications": [
            "Dairy cattle",
            "Beef cattle",
            "Poultry",
            "Swine"
        ],
        "categoryId": 5,
        "compositions": [
            {
                "value": 99,
                "nutrientId": 1
            },
            {
                "value": 0,
                "nutrientId": 2
            },
            {
                "value": 0,
                "nutrientId": 3
            },
            {
                "value": 0,
                "nutrientId": 4
            },
            {
                "value": 0,
                "nutrientId": 5
            },
            {
                "value": 0,
                "nutrientId": 6
            },
            {
                "value": 0,
                "nutrientId": 7
            },
            {
                "value": 27.38,
                "nutrientId": 8
            },
            {
                "value": 0,
                "nutrientId": 9
            },
            {
                "value": 0,
                "nutrientId": 10
            },
            {
                "value": 0,
                "nutrientId": 11
            },
            {
                "value": 0,
                "nutrientId": 12
            },
            {
                "value": 0,
                "nutrientId": 13
            },
            {
                "value": 0,
                "nutrientId": 14
            },
            {
                "value": 0,
                "nutrientId": 15
            },
            {
                "value": 0,
                "nutrientId": 16
            },
            {
                "value": 0,
                "nutrientId": 17
            },
            {
                "value": 0,
                "nutrientId": 18
            },
            {
                "value": 0,
                "nutrientId": 19
            },
            {
                "value": 0,
                "nutrientId": 20
            },
            {
                "value": 0,
                "nutrientId": 21
            },
            {
                "value": 0,
                "nutrientId": 22
            },
            {
                "value": 0,
                "nutrientId": 23
            },
            {
                "value": 0,
                "nutrientId": 24
            },
            {
                "value": 0,
                "nutrientId": 25
            },
            {
                "value": 0,
                "nutrientId": 26
            },
            {
                "value": 0,
                "nutrientId": 27
            },
            {
                "value": 0,
                "nutrientId": 28
            },
            {
                "value": 0,
                "nutrientId": 29
            },
            {
                "value": 0,
                "nutrientId": 30
            },
            {
                "value": 0,
                "nutrientId": 31
            },
            {
                "value": 0,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "32",
        "name": "Sorghum, milo, grain",
        "description": "Drought-tolerant cereal grain similar to corn in feeding value but with higher protein content. Lower tannin varieties are preferred for animal feed. Requires proper processing (cracking/rolling) for optimal digestibility.",
        "key_benefits": [
            "Drought resistant",
            "Higher protein than corn",
            "Good energy content",
            "Cost-effective"
        ],
        "applications": [
            "Poultry",
            "Swine",
            "Dairy cattle",
            "Beef cattle",
            "Sheep",
            "Goats"
        ],
        "categoryId": 1,
        "compositions": [
            {
                "value": 89,
                "nutrientId": 1
            },
            {
                "value": 11,
                "nutrientId": 2
            },
            {
                "value": 2.8,
                "nutrientId": 3
            },
            {
                "value": 2,
                "nutrientId": 4
            },
            {
                "value": 0.04,
                "nutrientId": 5
            },
            {
                "value": 0.29,
                "nutrientId": 6
            },
            {
                "value": 0.1,
                "nutrientId": 7
            },
            {
                "value": 0.03,
                "nutrientId": 8
            },
            {
                "value": 0.09,
                "nutrientId": 9
            },
            {
                "value": 0.34,
                "nutrientId": 10
            },
            {
                "value": 0.09,
                "nutrientId": 11
            },
            {
                "value": 1505,
                "nutrientId": 12
            },
            {
                "value": 3310,
                "nutrientId": 13
            },
            {
                "value": 13.85,
                "nutrientId": 14
            },
            {
                "value": 1.3,
                "nutrientId": 15
            },
            {
                "value": 678,
                "nutrientId": 16
            },
            {
                "value": 0.27,
                "nutrientId": 17
            },
            {
                "value": 0.21,
                "nutrientId": 18
            },
            {
                "value": 0.1,
                "nutrientId": 19
            },
            {
                "value": 0.09,
                "nutrientId": 20
            },
            {
                "value": 0.2,
                "nutrientId": 21
            },
            {
                "value": 0.17,
                "nutrientId": 22
            },
            {
                "value": 0.27,
                "nutrientId": 23
            },
            {
                "value": 0.22,
                "nutrientId": 24
            },
            {
                "value": 0.09,
                "nutrientId": 25
            },
            {
                "value": 0.08,
                "nutrientId": 26
            },
            {
                "value": 0.4,
                "nutrientId": 27
            },
            {
                "value": 0.3,
                "nutrientId": 28
            },
            {
                "value": 0.6,
                "nutrientId": 29
            },
            {
                "value": 0.53,
                "nutrientId": 30
            },
            {
                "value": 0.53,
                "nutrientId": 31
            },
            {
                "value": 0.46,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "33",
        "name": "Soybeans, full-fat, cooked",
        "description": "Complete nutrition source providing both high-quality protein and energy from natural oils. Must be properly heat-treated to deactivate trypsin inhibitors. Particularly valuable in swine and poultry starter diets.",
        "key_benefits": [
            "38% protein + 18% oil",
            "Excellent amino acid profile",
            "Energy dense",
            "No processing byproducts"
        ],
        "applications": [
            "Swine",
            "Poultry",
            "Dairy cattle",
            "Beef cattle",
            "Aquaculture"
        ],
        "categoryId": 3,
        "compositions": [
            {
                "value": 90,
                "nutrientId": 1
            },
            {
                "value": 38,
                "nutrientId": 2
            },
            {
                "value": 18,
                "nutrientId": 3
            },
            {
                "value": 5,
                "nutrientId": 4
            },
            {
                "value": 0.25,
                "nutrientId": 5
            },
            {
                "value": 0.59,
                "nutrientId": 6
            },
            {
                "value": 0.2,
                "nutrientId": 7
            },
            {
                "value": 0.04,
                "nutrientId": 8
            },
            {
                "value": 0.03,
                "nutrientId": 9
            },
            {
                "value": 1.7,
                "nutrientId": 10
            },
            {
                "value": 0.3,
                "nutrientId": 11
            },
            {
                "value": 1520,
                "nutrientId": 12
            },
            {
                "value": 3350,
                "nutrientId": 13
            },
            {
                "value": 14.02,
                "nutrientId": 14
            },
            {
                "value": 9.9,
                "nutrientId": 15
            },
            {
                "value": 2420,
                "nutrientId": 16
            },
            {
                "value": 2.4,
                "nutrientId": 17
            },
            {
                "value": 2.16,
                "nutrientId": 18
            },
            {
                "value": 0.54,
                "nutrientId": 19
            },
            {
                "value": 0.49,
                "nutrientId": 20
            },
            {
                "value": 0.55,
                "nutrientId": 21
            },
            {
                "value": 0.45,
                "nutrientId": 22
            },
            {
                "value": 1.69,
                "nutrientId": 23
            },
            {
                "value": 1.43,
                "nutrientId": 24
            },
            {
                "value": 0.52,
                "nutrientId": 25
            },
            {
                "value": 0.46,
                "nutrientId": 26
            },
            {
                "value": 2.8,
                "nutrientId": 27
            },
            {
                "value": 2.6,
                "nutrientId": 28
            },
            {
                "value": 2.18,
                "nutrientId": 29
            },
            {
                "value": 1.94,
                "nutrientId": 30
            },
            {
                "value": 2.02,
                "nutrientId": 31
            },
            {
                "value": 1.78,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "34",
        "name": "Soybean meal, expeller",
        "description": "High-protein plant ingredient from mechanical soybean oil extraction, retaining some residual oil (3-6%). Slightly lower protein but higher energy than solvent-extracted meal. Popular in organic feed formulations.",
        "key_benefits": [
            "44-46% protein",
            "Higher energy than solvent meal",
            "No chemical residues",
            "Good amino acid balance"
        ],
        "applications": [
            "All livestock",
            "Poultry",
            "Swine",
            "Dairy cattle",
            "Aquaculture"
        ],
        "categoryId": 3,
        "compositions": [
            {
                "value": 89,
                "nutrientId": 1
            },
            {
                "value": 42,
                "nutrientId": 2
            },
            {
                "value": 3.5,
                "nutrientId": 3
            },
            {
                "value": 6.5,
                "nutrientId": 4
            },
            {
                "value": 0.2,
                "nutrientId": 5
            },
            {
                "value": 0.6,
                "nutrientId": 6
            },
            {
                "value": 0.2,
                "nutrientId": 7
            },
            {
                "value": 0.04,
                "nutrientId": 8
            },
            {
                "value": 0.02,
                "nutrientId": 9
            },
            {
                "value": 1.71,
                "nutrientId": 10
            },
            {
                "value": 0.33,
                "nutrientId": 11
            },
            {
                "value": 1100,
                "nutrientId": 12
            },
            {
                "value": 2420,
                "nutrientId": 13
            },
            {
                "value": 10.13,
                "nutrientId": 14
            },
            {
                "value": 1.8,
                "nutrientId": 15
            },
            {
                "value": 2673,
                "nutrientId": 16
            },
            {
                "value": 2.7,
                "nutrientId": 17
            },
            {
                "value": 2.43,
                "nutrientId": 18
            },
            {
                "value": 0.6,
                "nutrientId": 19
            },
            {
                "value": 0.54,
                "nutrientId": 20
            },
            {
                "value": 0.62,
                "nutrientId": 21
            },
            {
                "value": 0.51,
                "nutrientId": 22
            },
            {
                "value": 1.7,
                "nutrientId": 23
            },
            {
                "value": 1.44,
                "nutrientId": 24
            },
            {
                "value": 0.58,
                "nutrientId": 25
            },
            {
                "value": 0.52,
                "nutrientId": 26
            },
            {
                "value": 3.2,
                "nutrientId": 27
            },
            {
                "value": 2.97,
                "nutrientId": 28
            },
            {
                "value": 2.8,
                "nutrientId": 29
            },
            {
                "value": 2.49,
                "nutrientId": 30
            },
            {
                "value": 2.2,
                "nutrientId": 31
            },
            {
                "value": 1.94,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "35",
        "name": "Soybean meal, solvent",
        "description": "The most widely used plant protein source in animal feeds, with consistent 47-49% protein content and excellent amino acid profile. Highly digestible and palatable. Industry standard for balanced feed formulations.",
        "key_benefits": [
            "Consistent quality",
            "Excellent amino acids",
            "Highly digestible",
            "Widely available"
        ],
        "applications": [
            "All livestock",
            "Poultry",
            "Swine",
            "Dairy cattle",
            "Aquaculture"
        ],
        "categoryId": 3,
        "compositions": [
            {
                "value": 90,
                "nutrientId": 1
            },
            {
                "value": 44,
                "nutrientId": 2
            },
            {
                "value": 0.5,
                "nutrientId": 3
            },
            {
                "value": 7,
                "nutrientId": 4
            },
            {
                "value": 0.25,
                "nutrientId": 5
            },
            {
                "value": 0.6,
                "nutrientId": 6
            },
            {
                "value": 0.2,
                "nutrientId": 7
            },
            {
                "value": 0.04,
                "nutrientId": 8
            },
            {
                "value": 0.02,
                "nutrientId": 9
            },
            {
                "value": 1.97,
                "nutrientId": 10
            },
            {
                "value": 0.43,
                "nutrientId": 11
            },
            {
                "value": 1020,
                "nutrientId": 12
            },
            {
                "value": 2240,
                "nutrientId": 13
            },
            {
                "value": 9.37,
                "nutrientId": 14
            },
            {
                "value": 0.3,
                "nutrientId": 15
            },
            {
                "value": 2743,
                "nutrientId": 16
            },
            {
                "value": 2.7,
                "nutrientId": 17
            },
            {
                "value": 2.43,
                "nutrientId": 18
            },
            {
                "value": 0.65,
                "nutrientId": 19
            },
            {
                "value": 0.58,
                "nutrientId": 20
            },
            {
                "value": 0.67,
                "nutrientId": 21
            },
            {
                "value": 0.55,
                "nutrientId": 22
            },
            {
                "value": 1.7,
                "nutrientId": 23
            },
            {
                "value": 1.44,
                "nutrientId": 24
            },
            {
                "value": 0.6,
                "nutrientId": 25
            },
            {
                "value": 0.53,
                "nutrientId": 26
            },
            {
                "value": 3.4,
                "nutrientId": 27
            },
            {
                "value": 3.16,
                "nutrientId": 28
            },
            {
                "value": 2.5,
                "nutrientId": 29
            },
            {
                "value": 2.22,
                "nutrientId": 30
            },
            {
                "value": 2.4,
                "nutrientId": 31
            },
            {
                "value": 2.11,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "36",
        "name": "Sunflower meal, expeller",
        "description": "Plant protein supplement remaining after mechanical sunflower oil extraction. Higher in fiber than soybean meal but good protein source. Particularly useful in ruminant diets where extra fiber is beneficial.",
        "key_benefits": [
            "28-32% protein",
            "Good fiber content",
            "Residual oil (3-8%)",
            "Non-GMO option"
        ],
        "applications": [
            "Dairy cattle",
            "Beef cattle",
            "Sheep",
            "Goats",
            "Poultry"
        ],
        "categoryId": 3,
        "compositions": [
            {
                "value": 93,
                "nutrientId": 1
            },
            {
                "value": 41,
                "nutrientId": 2
            },
            {
                "value": 7.6,
                "nutrientId": 3
            },
            {
                "value": 21,
                "nutrientId": 4
            },
            {
                "value": 0.43,
                "nutrientId": 5
            },
            {
                "value": 1,
                "nutrientId": 6
            },
            {
                "value": 0.25,
                "nutrientId": 7
            },
            {
                "value": 0.2,
                "nutrientId": 8
            },
            {
                "value": 0.01,
                "nutrientId": 9
            },
            {
                "value": 1,
                "nutrientId": 10
            },
            {
                "value": 0.1,
                "nutrientId": 11
            },
            {
                "value": 1050,
                "nutrientId": 12
            },
            {
                "value": 2310,
                "nutrientId": 13
            },
            {
                "value": 9.67,
                "nutrientId": 14
            },
            {
                "value": 6.5,
                "nutrientId": 15
            },
            {
                "value": 0,
                "nutrientId": 16
            },
            {
                "value": 2,
                "nutrientId": 17
            },
            {
                "value": 1.74,
                "nutrientId": 18
            },
            {
                "value": 1.6,
                "nutrientId": 19
            },
            {
                "value": 1.47,
                "nutrientId": 20
            },
            {
                "value": 0.8,
                "nutrientId": 21
            },
            {
                "value": 0.64,
                "nutrientId": 22
            },
            {
                "value": 1.6,
                "nutrientId": 23
            },
            {
                "value": 1.31,
                "nutrientId": 24
            },
            {
                "value": 0.6,
                "nutrientId": 25
            },
            {
                "value": 0.52,
                "nutrientId": 26
            },
            {
                "value": 4.2,
                "nutrientId": 27
            },
            {
                "value": 3.91,
                "nutrientId": 28
            },
            {
                "value": 2.4,
                "nutrientId": 29
            },
            {
                "value": 2.14,
                "nutrientId": 30
            },
            {
                "value": 2.4,
                "nutrientId": 31
            },
            {
                "value": 2.08,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "37",
        "name": "Sunflower meal, partially dehul, solv.",
        "description": "Higher-protein sunflower meal with some hulls removed before solvent extraction. Better amino acid profile than regular sunflower meal. Valuable alternative protein source when soybean meal is expensive.",
        "key_benefits": [
            "35-37% protein",
            "Better amino acid balance",
            "Lower fiber",
            "Cost-competitive"
        ],
        "applications": [
            "Dairy cattle",
            "Beef cattle",
            "Poultry",
            "Swine",
            "Sheep",
            "Goats"
        ],
        "categoryId": 3,
        "compositions": [
            {
                "value": 92,
                "nutrientId": 1
            },
            {
                "value": 34,
                "nutrientId": 2
            },
            {
                "value": 0.5,
                "nutrientId": 3
            },
            {
                "value": 13,
                "nutrientId": 4
            },
            {
                "value": 0.3,
                "nutrientId": 5
            },
            {
                "value": 1.25,
                "nutrientId": 6
            },
            {
                "value": 0.27,
                "nutrientId": 7
            },
            {
                "value": 0.2,
                "nutrientId": 8
            },
            {
                "value": 0.01,
                "nutrientId": 9
            },
            {
                "value": 1.6,
                "nutrientId": 10
            },
            {
                "value": 0.38,
                "nutrientId": 11
            },
            {
                "value": 1025,
                "nutrientId": 12
            },
            {
                "value": 2260,
                "nutrientId": 13
            },
            {
                "value": 9.46,
                "nutrientId": 14
            },
            {
                "value": 0.2,
                "nutrientId": 15
            },
            {
                "value": 1909,
                "nutrientId": 16
            },
            {
                "value": 1.42,
                "nutrientId": 17
            },
            {
                "value": 1.19,
                "nutrientId": 18
            },
            {
                "value": 0.64,
                "nutrientId": 19
            },
            {
                "value": 0.6,
                "nutrientId": 20
            },
            {
                "value": 0.55,
                "nutrientId": 21
            },
            {
                "value": 0.43,
                "nutrientId": 22
            },
            {
                "value": 1.48,
                "nutrientId": 23
            },
            {
                "value": 1.26,
                "nutrientId": 24
            },
            {
                "value": 0.35,
                "nutrientId": 25
            },
            {
                "value": 0.3,
                "nutrientId": 26
            },
            {
                "value": 2.8,
                "nutrientId": 27
            },
            {
                "value": 2.32,
                "nutrientId": 28
            },
            {
                "value": 1.39,
                "nutrientId": 29
            },
            {
                "value": 1.25,
                "nutrientId": 30
            },
            {
                "value": 1.64,
                "nutrientId": 31
            },
            {
                "value": 1.41,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "38",
        "name": "Triticale",
        "description": "Hybrid cereal grain combining the yield potential of wheat with the hardiness of rye. Nutritional profile similar to wheat but often more cost-effective. Requires proper processing for optimal digestibility in monogastrics.",
        "key_benefits": [
            "Good yield potential",
            "Higher protein than corn",
            "Drought tolerant",
            "Cost-effective"
        ],
        "applications": [
            "Poultry",
            "Swine",
            "Dairy cattle",
            "Beef cattle",
            "Sheep",
            "Goats"
        ],
        "categoryId": 1,
        "compositions": [
            {
                "value": 90,
                "nutrientId": 1
            },
            {
                "value": 12.5,
                "nutrientId": 2
            },
            {
                "value": 1.5,
                "nutrientId": 3
            },
            {
                "value": 2.59,
                "nutrientId": 4
            },
            {
                "value": 0.05,
                "nutrientId": 5
            },
            {
                "value": 0.3,
                "nutrientId": 6
            },
            {
                "value": 0.1,
                "nutrientId": 7
            },
            {
                "value": 0,
                "nutrientId": 8
            },
            {
                "value": 0.07,
                "nutrientId": 9
            },
            {
                "value": 0,
                "nutrientId": 10
            },
            {
                "value": 0.2,
                "nutrientId": 11
            },
            {
                "value": 1430,
                "nutrientId": 12
            },
            {
                "value": 3150,
                "nutrientId": 13
            },
            {
                "value": 13.18,
                "nutrientId": 14
            },
            {
                "value": 0.9,
                "nutrientId": 15
            },
            {
                "value": 460,
                "nutrientId": 16
            },
            {
                "value": 0.39,
                "nutrientId": 17
            },
            {
                "value": 0.35,
                "nutrientId": 18
            },
            {
                "value": 0.26,
                "nutrientId": 19
            },
            {
                "value": 0.23,
                "nutrientId": 20
            },
            {
                "value": 0.26,
                "nutrientId": 21
            },
            {
                "value": 0.22,
                "nutrientId": 22
            },
            {
                "value": 0.36,
                "nutrientId": 23
            },
            {
                "value": 0.31,
                "nutrientId": 24
            },
            {
                "value": 0.14,
                "nutrientId": 25
            },
            {
                "value": 0.12,
                "nutrientId": 26
            },
            {
                "value": 0.48,
                "nutrientId": 27
            },
            {
                "value": 0.39,
                "nutrientId": 28
            },
            {
                "value": 0.76,
                "nutrientId": 29
            },
            {
                "value": 0.7,
                "nutrientId": 30
            },
            {
                "value": 0.51,
                "nutrientId": 31
            },
            {
                "value": 0.44,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "39",
        "name": "Wheat, hard grain",
        "description": "High-protein wheat variety excellent for livestock feed when properly processed (rolled/cracked). The gluten protein provides good binding properties in pelleted feeds. Higher protein content supports muscle development.",
        "key_benefits": [
            "12-14% protein",
            "Good pellet binder",
            "Highly digestible starch",
            "Versatile ingredient"
        ],
        "applications": [
            "Poultry",
            "Swine",
            "Dairy cattle",
            "Beef cattle",
            "Sheep",
            "Goats"
        ],
        "categoryId": 1,
        "compositions": [
            {
                "value": 88,
                "nutrientId": 1
            },
            {
                "value": 13.5,
                "nutrientId": 2
            },
            {
                "value": 1.9,
                "nutrientId": 3
            },
            {
                "value": 3,
                "nutrientId": 4
            },
            {
                "value": 0.05,
                "nutrientId": 5
            },
            {
                "value": 0.41,
                "nutrientId": 6
            },
            {
                "value": 0.12,
                "nutrientId": 7
            },
            {
                "value": 0.06,
                "nutrientId": 8
            },
            {
                "value": 0.07,
                "nutrientId": 9
            },
            {
                "value": 0.5,
                "nutrientId": 10
            },
            {
                "value": 0.1,
                "nutrientId": 11
            },
            {
                "value": 1440,
                "nutrientId": 12
            },
            {
                "value": 3170,
                "nutrientId": 13
            },
            {
                "value": 13.26,
                "nutrientId": 14
            },
            {
                "value": 1,
                "nutrientId": 15
            },
            {
                "value": 778,
                "nutrientId": 16
            },
            {
                "value": 0.4,
                "nutrientId": 17
            },
            {
                "value": 0.32,
                "nutrientId": 18
            },
            {
                "value": 0.25,
                "nutrientId": 19
            },
            {
                "value": 0.22,
                "nutrientId": 20
            },
            {
                "value": 0.3,
                "nutrientId": 21
            },
            {
                "value": 0.26,
                "nutrientId": 22
            },
            {
                "value": 0.35,
                "nutrientId": 23
            },
            {
                "value": 0.29,
                "nutrientId": 24
            },
            {
                "value": 0.18,
                "nutrientId": 25
            },
            {
                "value": 0.16,
                "nutrientId": 26
            },
            {
                "value": 0.6,
                "nutrientId": 27
            },
            {
                "value": 0.53,
                "nutrientId": 28
            },
            {
                "value": 0.69,
                "nutrientId": 29
            },
            {
                "value": 0.61,
                "nutrientId": 30
            },
            {
                "value": 0.69,
                "nutrientId": 31
            },
            {
                "value": 0.59,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "40",
        "name": "Wheat, soft grain",
        "description": "Lower-protein wheat variety with higher starch content, providing excellent energy for livestock. More rapidly digested than hard wheat. Particularly valuable in poultry and swine finishing diets.",
        "key_benefits": [
            "Higher energy than hard wheat",
            "Faster starch digestion",
            "Excellent palatability",
            "Good pellet quality"
        ],
        "applications": [
            "Poultry",
            "Swine",
            "Dairy cattle",
            "Beef cattle",
            "Sheep",
            "Goats"
        ],
        "categoryId": 1,
        "compositions": [
            {
                "value": 86,
                "nutrientId": 1
            },
            {
                "value": 10.8,
                "nutrientId": 2
            },
            {
                "value": 1.7,
                "nutrientId": 3
            },
            {
                "value": 2.8,
                "nutrientId": 4
            },
            {
                "value": 0.05,
                "nutrientId": 5
            },
            {
                "value": 0.3,
                "nutrientId": 6
            },
            {
                "value": 0.11,
                "nutrientId": 7
            },
            {
                "value": 0.06,
                "nutrientId": 8
            },
            {
                "value": 0.07,
                "nutrientId": 9
            },
            {
                "value": 0.4,
                "nutrientId": 10
            },
            {
                "value": 0.1,
                "nutrientId": 11
            },
            {
                "value": 1460,
                "nutrientId": 12
            },
            {
                "value": 3210,
                "nutrientId": 13
            },
            {
                "value": 13.43,
                "nutrientId": 14
            },
            {
                "value": 1,
                "nutrientId": 15
            },
            {
                "value": 778,
                "nutrientId": 16
            },
            {
                "value": 0.3,
                "nutrientId": 17
            },
            {
                "value": 0.24,
                "nutrientId": 18
            },
            {
                "value": 0.14,
                "nutrientId": 19
            },
            {
                "value": 0.12,
                "nutrientId": 20
            },
            {
                "value": 0.2,
                "nutrientId": 21
            },
            {
                "value": 0.17,
                "nutrientId": 22
            },
            {
                "value": 0.28,
                "nutrientId": 23
            },
            {
                "value": 0.23,
                "nutrientId": 24
            },
            {
                "value": 0.12,
                "nutrientId": 25
            },
            {
                "value": 0.11,
                "nutrientId": 26
            },
            {
                "value": 0.4,
                "nutrientId": 27
            },
            {
                "value": 0.35,
                "nutrientId": 28
            },
            {
                "value": 0.43,
                "nutrientId": 29
            },
            {
                "value": 0.38,
                "nutrientId": 30
            },
            {
                "value": 0.48,
                "nutrientId": 31
            },
            {
                "value": 0.41,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "41",
        "name": "Wheat bran",
        "description": "Fiber-rich byproduct of wheat milling, containing the outer layers of the grain. Excellent source of insoluble fiber that promotes digestive health and rumen function. Also provides B-vitamins and minerals.",
        "key_benefits": [
            "High insoluble fiber",
            "Supports gut motility",
            "Good mineral content",
            "Cost-effective"
        ],
        "applications": [
            "Dairy cattle",
            "Horses",
            "Poultry",
            "Swine",
            "Sheep",
            "Goats"
        ],
        "categoryId": 8,
        "compositions": [
            {
                "value": 89,
                "nutrientId": 1
            },
            {
                "value": 14.8,
                "nutrientId": 2
            },
            {
                "value": 4,
                "nutrientId": 3
            },
            {
                "value": 10,
                "nutrientId": 4
            },
            {
                "value": 0.14,
                "nutrientId": 5
            },
            {
                "value": 1.17,
                "nutrientId": 6
            },
            {
                "value": 0.38,
                "nutrientId": 7
            },
            {
                "value": 0.06,
                "nutrientId": 8
            },
            {
                "value": 0.14,
                "nutrientId": 9
            },
            {
                "value": 1.2,
                "nutrientId": 10
            },
            {
                "value": 0.22,
                "nutrientId": 11
            },
            {
                "value": 590,
                "nutrientId": 12
            },
            {
                "value": 1300,
                "nutrientId": 13
            },
            {
                "value": 5.44,
                "nutrientId": 14
            },
            {
                "value": 2.1,
                "nutrientId": 15
            },
            {
                "value": 980,
                "nutrientId": 16
            },
            {
                "value": 0.6,
                "nutrientId": 17
            },
            {
                "value": 0.43,
                "nutrientId": 18
            },
            {
                "value": 0.2,
                "nutrientId": 19
            },
            {
                "value": 0.15,
                "nutrientId": 20
            },
            {
                "value": 0.3,
                "nutrientId": 21
            },
            {
                "value": 0.22,
                "nutrientId": 22
            },
            {
                "value": 0.48,
                "nutrientId": 23
            },
            {
                "value": 0.35,
                "nutrientId": 24
            },
            {
                "value": 0.3,
                "nutrientId": 25
            },
            {
                "value": 0.24,
                "nutrientId": 26
            },
            {
                "value": 1.07,
                "nutrientId": 27
            },
            {
                "value": 0.88,
                "nutrientId": 28
            },
            {
                "value": 0.6,
                "nutrientId": 29
            },
            {
                "value": 0.47,
                "nutrientId": 30
            },
            {
                "value": 0.7,
                "nutrientId": 31
            },
            {
                "value": 0.54,
                "nutrientId": 32
            }
        ]
    },
    {
        "id": "42",
        "name": "Wheat middlings",
        "description": "Nutrient-dense milling byproduct containing a mix of bran, germ and endosperm particles. Higher protein and energy than bran alone. Excellent feed ingredient for both energy and protein contribution.",
        "key_benefits": [
            "Balanced nutrition",
            "16-18% protein",
            "Good energy content",
            "Highly palatable"
        ],
        "applications": [
            "All livestock",
            "Poultry",
            "Swine",
            "Dairy cattle",
            "Horses"
        ],
        "categoryId": 8,
        "compositions": [
            {
                "value": 89,
                "nutrientId": 1
            },
            {
                "value": 15,
                "nutrientId": 2
            },
            {
                "value": 3.6,
                "nutrientId": 3
            },
            {
                "value": 8.5,
                "nutrientId": 4
            },
            {
                "value": 0.15,
                "nutrientId": 5
            },
            {
                "value": 1.17,
                "nutrientId": 6
            },
            {
                "value": 0.45,
                "nutrientId": 7
            },
            {
                "value": 0.06,
                "nutrientId": 8
            },
            {
                "value": 0.07,
                "nutrientId": 9
            },
            {
                "value": 0.6,
                "nutrientId": 10
            },
            {
                "value": 0.16,
                "nutrientId": 11
            },
            {
                "value": 950,
                "nutrientId": 12
            },
            {
                "value": 2090,
                "nutrientId": 13
            },
            {
                "value": 8.74,
                "nutrientId": 14
            },
            {
                "value": 1.9,
                "nutrientId": 15
            },
            {
                "value": 110,
                "nutrientId": 16
            },
            {
                "value": 0.7,
                "nutrientId": 17
            },
            {
                "value": 0.56,
                "nutrientId": 18
            },
            {
                "value": 0.12,
                "nutrientId": 19
            },
            {
                "value": 0.1,
                "nutrientId": 20
            },
            {
                "value": 0.19,
                "nutrientId": 21
            },
            {
                "value": 0.14,
                "nutrientId": 22
            },
            {
                "value": 0.5,
                "nutrientId": 23
            },
            {
                "value": 0.36,
                "nutrientId": 24
            },
            {
                "value": 0.2,
                "nutrientId": 25
            },
            {
                "value": 0.16,
                "nutrientId": 26
            },
            {
                "value": 1,
                "nutrientId": 27
            },
            {
                "value": 0.8,
                "nutrientId": 28
            },
            {
                "value": 0.7,
                "nutrientId": 29
            },
            {
                "value": 0.58,
                "nutrientId": 30
            },
            {
                "value": 0.8,
                "nutrientId": 31
            },
            {
                "value": 0.61,
                "nutrientId": 32
            }
        ]
    }
]

export const getIngredients = () => ALL_INGREDIENTS.map(ingredient => {
    const category = INGREDIENT_CATEGORIES.find(c => c.id.toString() === ingredient.id)
    return {
        ...ingredient,
        category,
        compositions: ingredient.compositions.map(composition => {
            const nutrient = getNutrients().find(n => n.id === composition.nutrientId.toString())
            return {
                ...composition,
                nutrient
            }
        })
    }
})