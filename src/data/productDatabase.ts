import { Category } from '@/types';

export interface ProductDef {
  name: string;
  category: Category;
  aliases: string[];
  substitutes: string[];
  seasonal?: string[]; // Array of months e.g. ['Sep', 'Oct'] or 'summer'
  defaultUnit: string;
}

export const PRODUCT_DB: ProductDef[] = [
  { name: 'Milk', category: 'Dairy', aliases: ['milk', 'regular milk'], substitutes: ['Almond Milk', 'Oat Milk'], defaultUnit: 'bottle' },
  { name: 'Almond Milk', category: 'Dairy', aliases: ['almond milk'], substitutes: ['Oat Milk'], defaultUnit: 'carton' },
  { name: 'Oat Milk', category: 'Dairy', aliases: ['oat milk'], substitutes: ['Almond Milk'], defaultUnit: 'carton' },
  { name: 'Eggs', category: 'Dairy', aliases: ['eggs', 'egg'], substitutes: [], defaultUnit: 'dozen' },
  { name: 'Bread', category: 'Bakery', aliases: ['bread', 'loaf of bread'], substitutes: ['Whole Wheat Bread', 'Gluten-Free Bread'], defaultUnit: 'loaf' },
  { name: 'Apples', category: 'Produce', aliases: ['apple', 'apples'], substitutes: ['Pears'], seasonal: ['Sep', 'Oct', 'Nov'], defaultUnit: 'kg' },
  { name: 'Bananas', category: 'Produce', aliases: ['banana', 'bananas'], substitutes: [], defaultUnit: 'bunch' },
  { name: 'Oranges', category: 'Produce', aliases: ['orange', 'oranges'], substitutes: ['Tangerines'], seasonal: ['Dec', 'Jan', 'Feb'], defaultUnit: 'kg' },
  { name: 'Chicken', category: 'Meat', aliases: ['chicken', 'chicken breast'], substitutes: ['Turkey'], defaultUnit: 'kg' },
  { name: 'Beef', category: 'Meat', aliases: ['beef', 'steak', 'ground beef'], substitutes: ['Pork'], defaultUnit: 'kg' },
  { name: 'Water', category: 'Beverages', aliases: ['water', 'bottled water'], substitutes: ['Sparkling Water'], defaultUnit: 'bottle' },
  { name: 'Toothpaste', category: 'Household', aliases: ['toothpaste'], substitutes: [], defaultUnit: 'tube' },
  { name: 'Toilet Paper', category: 'Household', aliases: ['toilet paper', 'tp'], substitutes: ['Paper Towels'], defaultUnit: 'pack' },
  { name: 'Snacks', category: 'Snacks', aliases: ['snacks', 'chips', 'crisps'], substitutes: ['Popcorn'], defaultUnit: 'bag' }
];

export const matchProduct = (phrase: string): ProductDef | undefined => {
  const lowerPhrase = phrase.toLowerCase();
  for (const product of PRODUCT_DB) {
    if (product.aliases.some(alias => lowerPhrase.includes(alias))) {
      return product;
    }
  }
  return undefined;
};
