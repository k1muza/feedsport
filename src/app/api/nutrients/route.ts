import { getNutrients } from "@/data/nutrients";

// ignore unused request parameter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
    const nutrients = getNutrients();
    return new Response(JSON.stringify(nutrients), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}