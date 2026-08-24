export type Category = 'Produce' | 'Dairy' | 'Meat' | 'Bakery' | 'Pantry' | 'Snacks' | 'Beverages' | 'Household' | 'Other';

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string; // e.g., "bottles", "kg", "pieces"
  category: Category;
  addedAt: number;
  isPurchased?: boolean;
}

export interface Suggestion {
  id: string;
  name: string;
  reason: 'history' | 'seasonal' | 'substitute';
  message: string;
}

export interface SearchQuery {
  term: string;
  maxPrice?: number;
  brand?: string;
}

export type ActionType = 
  | { type: 'ADD_ITEM'; payload: Omit<ShoppingItem, 'id' | 'addedAt'> }
  | { type: 'REMOVE_ITEM'; payload: string } // item name
  | { type: 'UPDATE_QUANTITY'; payload: { name: string; quantity: number } }
  | { type: 'TOGGLE_PURCHASED'; payload: string }
  | { type: 'CLEAR_LIST'; }
  | { type: 'SET_SEARCH_QUERY'; payload: SearchQuery }
  | { type: 'OPEN_CART'; }
  | { type: 'CHANGE_LANGUAGE'; payload: { langCode: string } };

export interface ShoppingState {
  items: ShoppingItem[];
  history: ShoppingItem[]; // Previously bought items
  suggestions: Suggestion[];
  searchQuery: SearchQuery;
}
