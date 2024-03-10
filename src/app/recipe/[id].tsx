import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { Ingredients } from '@/components/ingredients';
import { Loading } from '@/components/loading';
import { Step } from '@/components/step';
import { services } from '@/services';
import { theme } from '@/theme';

export default function RecipeDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const [preparations, setPreparations] = useState<PreparationsResponse[]>([]);

  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await services.recipes.show(id);
        setRecipe(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipe();
  }, []);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await services.ingredients.findByRecipeId(id);
        setIngredients(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchIngredients();
  }, []);

  useEffect(() => {
    async function fetchPreparations() {
      try {
        const response = await services.preparations.findByRecipeId(id);
        setPreparations(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPreparations();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!id || !recipe) {
    return <Redirect href="/" />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.body}>
        <View style={styles.header}>
          <MaterialIcons size={32} name="arrow-back" onPress={() => router.back()} />

          <Text style={styles.name}>{recipe.name}</Text>
          <Text style={styles.time}>{recipe.minutes} minutos de preparo</Text>
        </View>

        <Ingredients ingredients={ingredients} />

        <View style={styles.content}>
          <Text style={styles.preparation}>Modo de preparado</Text>

          <FlatList
            data={preparations}
            renderItem={({ item }) => <Step step={item.step} description={item.description} />}
            contentContainerStyle={{ gap: 16 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    width: '100%',
    height: 192,
    backgroundColor: theme.colors.gray_300,
  },
  body: {
    borderTopStartRadius: theme.borderRadius.lg,
    borderTopEndRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.white,
    marginTop: -24,
  },
  header: {
    padding: 32,
  },
  content: {
    padding: 32,
  },
  name: {
    fontSize: theme.fonts.size.heading.md,
    fontFamily: theme.fonts.family.bold,
    marginTop: 22,
  },
  preparation: {
    fontSize: theme.fonts.size.heading.sm,
    fontFamily: theme.fonts.family.medium,
    marginBottom: 16,
  },
  time: {
    fontSize: theme.fonts.size.body.sm,
    fontFamily: theme.fonts.family.regular,
    color: theme.colors.gray_400,
  },
});
