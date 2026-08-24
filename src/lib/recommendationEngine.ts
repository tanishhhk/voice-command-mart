import { ShoppingState, Suggestion, ShoppingItem } from '@/types';
import { PRODUCT_DB } from '@/data/productDatabase';

// Helper to get current month abbreviation
const getCurrentMonth = () => {
  const date = new Date();
  return date.toLocaleString('default', { month: 'short' }); // e.g., 'Sep'
};

export const generateSuggestions = (state: ShoppingState): Suggestion[] => {
  const suggestions: Suggestion[] = [];
  const currentItemNames = new Set(state.items.map(i => i.name.toLowerCase()));
  const currentMonth = getCurrentMonth();

  // 1. Substitute Suggestions
  // If user just added something that has a substitute, suggest it.
  // Let's only look at the most recently added item (last in array).
  if (state.items.length > 0) {
    const lastItem = state.items[state.items.length - 1];
    const productDef = PRODUCT_DB.find(p => p.name === lastItem.name);
    if (productDef && productDef.substitutes.length > 0) {
      for (const sub of productDef.substitutes) {
        if (!currentItemNames.has(sub.toLowerCase())) {
          suggestions.push({
            id: `sub-${sub}`,
            name: sub,
            reason: 'substitute',
            message: `Prefer ${sub} instead of ${lastItem.name}?`
          });
          break; // just one sub suggestion at a time
        }
      }
    }
  }

  // 2. Seasonal Suggestions
  // Find products that are in season this month
  for (const product of PRODUCT_DB) {
    if (product.seasonal && product.seasonal.includes(currentMonth)) {
      if (!currentItemNames.has(product.name.toLowerCase())) {
        suggestions.push({
          id: `season-${product.name}`,
          name: product.name,
          reason: 'seasonal',
          message: `${product.name} is in season right now!`
        });
      }
    }
  }

  // 3. History-based Suggestions (Running low on...)
  // In a real app this would analyze frequency, here we just suggest randomly from history
  if (state.history.length > 0) {
    const historyItem = state.history.find(h => !currentItemNames.has(h.name.toLowerCase()));
    if (historyItem) {
      suggestions.push({
        id: `hist-${historyItem.name}`,
        name: historyItem.name,
        reason: 'history',
        message: `It looks like you might be running low on ${historyItem.name}.`
      });
    }
  } else {
    // Mock history for empty states
    const staples = ['Milk', 'Bread', 'Eggs'];
    for (const staple of staples) {
      if (!currentItemNames.has(staple.toLowerCase())) {
        suggestions.push({
          id: `staple-${staple}`,
          name: staple,
          reason: 'history',
          message: `Usually people need ${staple}. Add it?`
        });
        break; // just add one
      }
    }
  }

  // Deduplicate and limit to 3 suggestions
  const uniqueSuggestions = Array.from(new Map(suggestions.map(s => [s.name, s])).values());
  return uniqueSuggestions.slice(0, 3);
};
