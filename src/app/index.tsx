import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Ingredient } from '@/components/ingredient';
import { Loading } from '@/components/loading';
import { Selected } from '@/components/selected';
import { services } from '@/services';
import { theme } from '@/theme';

export default function Home() {
  const [selected, setSelected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const data = await services.ingredients.findAll();
        setIngredients(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected((prev) => prev.filter((item) => item !== value));
    }
    setSelected((prev) => [...prev, value]);
  }

  function handleSearch() {
    router.navigate('/recipes/' + selected);
  }

  function handleClearSelected() {
    Alert.alert('Limpar', 'Deseja limpar tudo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => setSelected([]) },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {'\n'}
        <Text style={styles.subtitle}>os produtos</Text>
      </Text>
      <Text style={styles.message}>Descubra receitas baseadas nos produtos que voce escolheu.</Text>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ingredients}>
          {ingredients.map((item) => (
            <Ingredient
              ingredient={item}
              key={item.id}
              onPress={() => handleToggleSelected(item.id)}
              selected={selected.includes(item.id)}
            />
          ))}
        </ScrollView>
      )}
      {selected.length > 0 && (
        <Selected
          quantity={selected.length}
          onClear={handleClearSelected}
          onSearch={handleSearch}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: theme.fonts.size.heading.xl,
    fontFamily: theme.fonts.family.bold,
  },
  subtitle: {
    fontFamily: theme.fonts.family.regular,
  },

  message: {
    fontSize: theme.fonts.size.body.md,
    fontFamily: theme.fonts.family.regular,
    color: theme.colors.gray_400,
    marginTop: 12,
    marginBottom: 38,
  },
  ingredients: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: 80,
    gap: 12,
  },
});
