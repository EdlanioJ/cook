import { supabase } from './supabase';

async function findByIds(ids: string[]) {
  const { data, error } = await supabase
    .from('ingredients')
    .select()
    .in('id', ids)
    .order('name')
    .returns<IngredientResponse[]>();

  if (error) throw error;
  return data ?? [];
}

async function findByRecipeId(id: string) {
  const { data, error } = await supabase
    .from('recipe_ingredients')
    .select('ingredients (id, name, image)')
    .eq('recipe_id', id)
    .returns<{ ingredients: IngredientResponse }[]>();

  if (error) throw error;
  return data ? data.map((item) => item.ingredients) : [];
}

async function findAll() {
  const { data, error } = await supabase
    .from('ingredients')
    .select()
    .order('name')
    .returns<IngredientResponse[]>();

  if (error) throw error;

  return data ?? [];
}

export { findAll, findByIds, findByRecipeId };
