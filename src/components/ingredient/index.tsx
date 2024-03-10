import { Image, Pressable, PressableProps, Text } from 'react-native';

import { styles } from './styles';

import { services } from '@/services';

export type IngredientsProps = {
  ingredient: IngredientResponse;
  selected?: boolean;
} & PressableProps;

export function Ingredient({ ingredient, selected = false, ...rest }: IngredientsProps) {
  return (
    <Pressable {...rest} style={[styles.container, selected && styles.selected]}>
      <Image
        source={{ uri: `${services.storage.imagePath}/${ingredient.image}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{ingredient.name}</Text>
    </Pressable>
  );
}
