import { Product } from '@/types/product';

export const parseUnit = (quantityStr: string) => {
  const lower = quantityStr.toLowerCase().trim();
  const match = lower.match(/^([\d.]+)\s*([a-z]+)$/);
  if (!match) return { amount: parseFloat(lower) || 1, type: 'count' };

  let amount = parseFloat(match[1]);
  let unit = match[2];

  if (unit === 'kg' || unit === 'kilos' || unit === 'kilogram') return { amount: amount * 1000, type: 'weight' };
  if (unit === 'g' || unit === 'grams' || unit === 'gram') return { amount: amount, type: 'weight' };
  if (unit === 'dozen' || unit === 'dozens') return { amount: amount * 12, type: 'count' };
  if (unit === 'bunch' || unit === 'bunches') return { amount: amount, type: 'count' };
  
  return { amount, type: 'count' };
};

export const calculateItemPrice = (product: Product | undefined, requestedQuantity: number, requestedUnit: string): number => {
  if (!product) return 0;
  
  const requestedParsed = parseUnit(`${requestedQuantity} ${requestedUnit}`);
  const baseParsed = parseUnit(product.quantity || '1 pc');

  if (requestedParsed.type !== baseParsed.type) {
    return product.price * requestedQuantity;
  }

  const multiplier = requestedParsed.amount / baseParsed.amount;
  return product.price * multiplier;
};
