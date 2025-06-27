import { getNutrients } from "@/data/nutrients";

export const revalidate = 0
export const dynamic = 'force-static'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request): Promise<Response> {
    const nutrients = getNutrients();
    return new Response(JSON.stringify(nutrients), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}