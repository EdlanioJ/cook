import { supabase } from './supabase';

async function findByRecipeId(id: string) {
  const { data, error } = await supabase
    .from('preparations')
    .select()
    .eq('recipe_id', id)
    .returns<PreparationsResponse[]>();

  if (error) throw error;
  return data ?? [];
}

export { findByRecipeId };
