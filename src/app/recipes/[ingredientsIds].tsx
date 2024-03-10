import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Ingredients } from '@/components/ingredients';
import { Recipe } from '@/components/recipe';
import { services } from '@/services';
import { theme } from '@/theme';

export default function Recipes() {
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);

  const { ingredientsIds } = useLocalSearchParams<{ ingredientsIds: string }>();

  const ids = ingredientsIds.split(',');

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await services.ingredients.findByIds(ids);
        setIngredients(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchIngredients();
  }, []);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await services.recipes.findByIngredientsIds(ids);
        setRecipes(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchIngredients();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={32} onPress={() => router.back()} />

        <Text style={styles.title}>Ingredientes</Text>
      </View>
      <Ingredients ingredients={ingredients} />
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        style={styles.recipes}
        contentContainerStyle={styles.recipesContent}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <Recipe onPress={() => router.navigate('/recipe/' + item.id)} recipe={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 32,
    paddingTop: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: theme.fonts.size.heading.md,
    fontFamily: theme.fonts.family.bold,
    marginTop: 22,
  },

  recipes: {
    padding: 32,
  },
  recipesContent: {
    gap: 16,
  },
});
