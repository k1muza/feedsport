import { IngredientDetails } from '@/components/admin/IngredientDetails';

export default async function IngredientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <IngredientDetails id={id} />;
} 