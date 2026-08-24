"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useState } from 'react';
import { ShoppingState, ActionType, ShoppingItem, Category } from '@/types';
import { products } from '@/data/products';
import { Product } from '@/types/product';

const initialState: ShoppingState = {
  items: [],
  history: [],
  suggestions: [],
  searchQuery: { term: '' },
};

const shoppingReducer = (state: ShoppingState, action: ActionType): ShoppingState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (i) => i.name.toLowerCase() === action.payload.name.toLowerCase()
      );
      if (existingItemIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: newItems };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            id: Math.random().toString(36).substring(2, 9),
            addedAt: Date.now(),
          },
        ],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(
          (i) => i.name.toLowerCase() !== action.payload.toLowerCase()
        ),
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((i) =>
          i.name.toLowerCase() === action.payload.name.toLowerCase()
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }
    case 'TOGGLE_PURCHASED': {
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, isPurchased: !i.isPurchased } : i
        ),
      };
    }
    case 'CLEAR_LIST':
      return { ...state, items: [] };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

interface LegacyCartItem {
  product: Product;
  quantity: number;
}

const ShoppingContext = createContext<{
  state: ShoppingState;
  dispatch: React.Dispatch<ActionType>;
  // Legacy APIs for old UI components
  cart: LegacyCartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  highlightedItem: { productId: number, badgeQuantity: number } | null;
  searchResults: number[];
  simulateVoiceCommand: () => void;
} | undefined>(undefined);

export const ShoppingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [highlightedItem, setHighlightedItem] = useState<{ productId: number, badgeQuantity: number } | null>(null);
  const [searchResults, setSearchResults] = useState<number[]>([]);

  // Map state.items to legacy cart
  const cart: LegacyCartItem[] = state.items.map(item => {
    // Try to find the matching product in their DB
    const matchingProduct = products.find(p => p.name.toLowerCase().includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(p.name.toLowerCase()));
    
    return {
      product: matchingProduct || {
        id: Math.random(),
        name: item.name,
        brand: 'Generic',
        category: item.category as any,
        price: 100,
        image: '',
        quantity: item.unit
      },
      quantity: item.quantity
    };
  });

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const simulateVoiceCommand = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        name: 'Whole Milk',
        category: 'Dairy',
        quantity: 2,
        unit: 'bottles'
      }
    });
    const milk = products.find(p => p.name === 'Whole Milk');
    if (milk) {
      setHighlightedItem({ productId: milk.id, badgeQuantity: 2 });
      setTimeout(() => setHighlightedItem(null), 3000);
    }
  };

  // When state.items changes, let's highlight the last added item
  useEffect(() => {
    if (state.items.length > 0) {
      const lastItem = state.items[state.items.length - 1];
      const matchingProduct = products.find(p => p.name.toLowerCase().includes(lastItem.name.toLowerCase()) || lastItem.name.toLowerCase().includes(p.name.toLowerCase()));
      if (matchingProduct) {
        setHighlightedItem({ productId: matchingProduct.id, badgeQuantity: lastItem.quantity });
        const timer = setTimeout(() => setHighlightedItem(null), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [state.items]);

  // Compute search results when searchQuery changes
  useEffect(() => {
    if (!state.searchQuery.term && !state.searchQuery.brand && !state.searchQuery.maxPrice) {
      setSearchResults([]);
      return;
    }
    
    const term = (state.searchQuery.term || '').toLowerCase();
    const brand = (state.searchQuery.brand || '').toLowerCase();
    const maxPrice = state.searchQuery.maxPrice;

    const results = products.filter(p => {
      let matches = true;
      if (term) {
        matches = matches && (p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
      }
      if (brand) {
        matches = matches && p.brand.toLowerCase().includes(brand);
      }
      if (maxPrice !== undefined) {
        matches = matches && p.price <= maxPrice;
      }
      return matches;
    });

    setSearchResults(results.map(r => r.id));
  }, [state.searchQuery]);

  return (
    <ShoppingContext.Provider value={{ 
      state, 
      dispatch,
      cart,
      isCartOpen,
      toggleCart,
      highlightedItem,
      searchResults,
      simulateVoiceCommand
    }}>
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShopping = () => {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
};
