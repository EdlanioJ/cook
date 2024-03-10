import * as ingredients from './ingredients';
import * as preparations from './preparations';
import * as recipes from './recipes';

const imagePath = process.env.EXPO_PUBLIC_STORAGE_URL!;

export const services = {
  ingredients,
  preparations,
  recipes,
  storage: {
    imagePath,
  },
};
