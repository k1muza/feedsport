import { getIngredients } from "@/data/ingredients";

export const revalidate = 0

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
    const ingredients = getIngredients();
    return new Response(JSON.stringify(ingredients), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}