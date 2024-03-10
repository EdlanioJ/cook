import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import Animated, { BounceOutDown, SlideInDown } from 'react-native-reanimated';

import { styles } from './styles';
import { Button } from '../button';

import { theme } from '@/theme';

type Props = {
  quantity: number;
  onClear: () => void;
  onSearch: () => void;
};

export function Selected({ onClear, onSearch, quantity }: Props) {
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown.duration(320)}
      exiting={BounceOutDown}>
      <View style={styles.header}>
        <Text style={styles.label}>{quantity} ingredientes selecionados</Text>
        <MaterialIcons color={theme.colors.gray_400} name="close" size={24} onPress={onClear} />
      </View>
      <Button title="Encontrar" onPress={onSearch} />
    </Animated.View>
  );
}
