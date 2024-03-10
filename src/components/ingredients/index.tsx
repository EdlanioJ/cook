import { ScrollView } from 'react-native';

import { styles } from './styles';

import { Ingredient } from '@/components/ingredient';

type Props = {
  ingredients: IngredientResponse[];
};

export function Ingredients({ ingredients }: Props) {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      contentContainerStyle={styles.ingredientsContent}
      showsHorizontalScrollIndicator={false}>
      {ingredients.map((ingredient) => (
        <Ingredient key={ingredient.id} ingredient={ingredient} />
      ))}
    </ScrollView>
  );
}
