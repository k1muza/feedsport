import { getIngredients } from "@/data/ingredients";

export async function GET(request: Request) {
    const ingredients = getIngredients();
    return new Response(JSON.stringify(ingredients), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}