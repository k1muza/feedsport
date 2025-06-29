import {IngredientDetails} from "@/components/admin/IngredientDetails";
import { getIngredients } from "@/data/ingredients";

export const generateStaticParams = async () => {
  const ingredients = await getIngredients();
  return ingredients.map(ingredient => ({ id: ingredient.id.toString() }));
}

export default async function IngredientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="container mx-auto px-4">
      <IngredientDetails id={id} />
    </div>
  );
}

