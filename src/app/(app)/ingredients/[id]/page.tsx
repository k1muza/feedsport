import { IngredientDetails } from '@/components/admin/IngredientDetails';

export default function IngredientDetailsPage({ params }: { params: { id: string } }) {
  return <IngredientDetails id={params.id} />;
} 