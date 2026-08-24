"use client";

import React, { useMemo } from 'react';
import { useShopping } from '@/context/ShoppingContext';
import { ShoppingItem, Category } from '@/types';
import { Check, Trash2, Plus, Minus, SearchX } from 'lucide-react';
import { products } from '@/data/products';
import { calculateItemPrice } from '@/utils/pricing';

export const ShoppingList = () => {
  const { state, dispatch } = useShopping();

  // Filter items by search query
  const filteredItems = useMemo(() => {
    if (!state.searchQuery.term && !state.searchQuery.brand && !state.searchQuery.maxPrice) return state.items;
    const query = (state.searchQuery.term || '').toLowerCase();
    return state.items.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query)
    );
  }, [state.items, state.searchQuery]);

  // Group by category
  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, ShoppingItem[]>);
  }, [filteredItems]);

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-amber-800/70 dark:text-sky-200/70 bg-white dark:bg-gray-900/20 rounded-2xl border border-sky-200 dark:border-amber-700">
        <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center opacity-50">
          <span className="text-2xl">🛒</span>
        </div>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Your list is empty.</p>
        <p className="text-sm text-gray-500 dark:text-gray-600 mt-1">Tap the mic and say "Add milk"</p>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-amber-800/70 dark:text-sky-200/70">
        <SearchX className="w-12 h-12 mb-3 text-gray-400 dark:text-gray-600" />
        <p>No items match "{state.searchQuery.term || 'your filters'}"</p>
        <button 
          onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: { term: '' } })}
          className="mt-4 text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 text-sm font-medium"
        >
          Clear Search
        </button>
      </div>
    );
  }

  // Calculate total
  const totalPrice = filteredItems.reduce((acc, item) => {
    const product = products.find(p => p.name === item.name);
    return acc + calculateItemPrice(product, item.quantity, item.unit || "pc");
  }, 0);

  return (
    <div className="space-y-4">
      {(state.searchQuery.term || state.searchQuery.brand || state.searchQuery.maxPrice) && (
        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm border border-gray-200 dark:border-gray-700">
          <span className="text-gray-700 dark:text-gray-300">Filtering by: <span className="font-semibold text-emerald-600 dark:text-emerald-400">"{state.searchQuery.term || state.searchQuery.brand || 'filters'}"</span></span>
          <button 
            onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: { term: '' } })}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            Clear
          </button>
        </div>
      )}

      <div className="bg-sky-100 dark:bg-[#3E2723] rounded-2xl border border-sky-200 dark:border-amber-700 overflow-hidden shadow-lg p-6">
        <div className="border-b border-sky-200 dark:border-amber-700 pb-4 mb-4">
          <h3 className="font-bold text-xl text-amber-950 dark:text-[#E1F5FE] tracking-wide">Shopping Bill</h3>
        </div>
        
        <ul className="space-y-4">
          {filteredItems.map(item => {
            const product = products.find(p => p.name === item.name);
            const itemTotal = calculateItemPrice(product, item.quantity, item.unit || "pc");
            
            return (
            <li key={item.id} className={`flex items-center justify-between group ${item.isPurchased ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-4 flex-1">
                <button 
                  onClick={() => dispatch({ type: 'TOGGLE_PURCHASED', payload: item.id })}
                  className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    item.isPurchased 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'border-amber-900/30 dark:border-sky-100/30 text-transparent hover:border-emerald-500 dark:hover:border-emerald-400'
                  }`}
                >
                  <Check className="w-3 h-3" />
                </button>
                
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className={`font-semibold text-lg text-amber-950 dark:text-[#E1F5FE] ${item.isPurchased ? 'line-through' : ''}`}>
                      {item.name}
                    </span>
                    <span className="text-amber-800/70 dark:text-sky-200/70 text-sm font-medium">
                      x {item.quantity === 1 && item.unit.startsWith('1 ') ? item.unit : `${item.quantity} ${item.unit}`}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="font-bold text-amber-950 dark:text-sky-50 text-lg w-24 text-right">
                  ₹{itemTotal.toFixed(2)}
                </span>
                
                <button 
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.name })}
                  className="text-gray-400 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 p-2 transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          )})}
        </ul>

        <div className="border-t border-sky-200 dark:border-amber-700 mt-6 pt-6 flex justify-between items-center">
          <span className="text-amber-900/80 dark:text-sky-100/80 font-medium">Total Amount</span>
          <span className="font-bold text-2xl text-amber-950 dark:text-sky-50">
            ₹{totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
