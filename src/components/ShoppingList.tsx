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
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 text-amber-800/70 dark:text-sky-200/70 bg-white/80 dark:bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-sky-200 dark:border-amber-700 shadow-sm">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center opacity-70">
          <span className="text-xl sm:text-2xl">🛒</span>
        </div>
        <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300">Your list is empty.</p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Tap the mic and say &quot;Add milk&quot;</p>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 text-amber-800/70 dark:text-sky-200/70">
        <SearchX className="w-10 h-10 sm:w-12 sm:h-12 mb-3 text-gray-400 dark:text-gray-600" />
        <p className="text-sm sm:text-base">No items match &quot;{state.searchQuery.term || 'your filters'}&quot;</p>
        <button 
          onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: { term: '' } })}
          className="mt-4 text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 text-xs sm:text-sm font-medium"
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
    <div className="space-y-3 sm:space-y-4">
      {(state.searchQuery.term || state.searchQuery.brand || state.searchQuery.maxPrice) && (
        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm border border-gray-200 dark:border-gray-700">
          <span className="text-gray-700 dark:text-gray-300 truncate max-w-[70%]">Filtering by: <span className="font-semibold text-emerald-600 dark:text-emerald-400">&quot;{state.searchQuery.term || state.searchQuery.brand || 'filters'}&quot;</span></span>
          <button 
            onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: { term: '' } })}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white font-medium"
          >
            Clear
          </button>
        </div>
      )}

      <div className="bg-sky-100 dark:bg-[#3E2723] rounded-2xl border border-sky-200 dark:border-amber-700 overflow-hidden shadow-lg p-4 sm:p-6">
        <div className="border-b border-sky-200 dark:border-amber-700 pb-3 sm:pb-4 mb-3 sm:mb-4">
          <h3 className="font-bold text-lg sm:text-xl text-amber-950 dark:text-[#E1F5FE] tracking-wide">Shopping List</h3>
        </div>
        
        <ul className="space-y-3 sm:space-y-4">
          {filteredItems.map(item => {
            const product = products.find(p => p.name === item.name);
            const itemTotal = calculateItemPrice(product, item.quantity, item.unit || "pc");
            
            return (
            <li key={item.id} className={`flex items-center justify-between gap-2 group ${item.isPurchased ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-2.5 sm:gap-4 flex-1 min-w-0">
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
                
                <div className="flex flex-col min-w-0">
                  <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
                    {product && products.filter(p => p.category === product.category).length > 1 ? (
                      <select 
                        value={item.name}
                        onChange={(e) => {
                          const newProduct = products.find(p => p.name === e.target.value);
                          if (newProduct) {
                            dispatch({ type: 'REMOVE_ITEM', payload: item.name });
                            dispatch({ type: 'ADD_ITEM', payload: { name: newProduct.name, category: newProduct.category, quantity: item.quantity, unit: item.unit } });
                          }
                        }}
                        className={`font-semibold text-sm sm:text-base md:text-lg text-amber-950 dark:text-[#E1F5FE] bg-transparent border-b border-dashed border-amber-950/30 dark:border-[#E1F5FE]/30 focus:outline-none focus:border-emerald-500 cursor-pointer truncate max-w-[150px] sm:max-w-[200px] ${item.isPurchased ? 'line-through opacity-70' : ''}`}
                      >
                        {products.filter(p => p.category === product.category).map(alt => (
                          <option key={alt.id} value={alt.name} className="text-gray-900 bg-white dark:bg-gray-800 dark:text-white">
                            {alt.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className={`font-semibold text-sm sm:text-base md:text-lg text-amber-950 dark:text-[#E1F5FE] truncate ${item.isPurchased ? 'line-through' : ''}`}>
                        {item.name}
                      </span>
                    )}
                    <span className="text-amber-800/70 dark:text-sky-200/70 text-xs sm:text-sm font-medium">
                      x {item.quantity === 1 && item.unit.startsWith('1 ') ? item.unit : `${item.quantity} ${item.unit}`}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <span className="font-bold text-amber-950 dark:text-sky-50 text-sm sm:text-base md:text-lg min-w-[60px] sm:w-24 text-right">
                  ₹{itemTotal.toFixed(2)}
                </span>
                
                <button 
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.name })}
                  className="text-red-500/70 sm:text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 p-1.5 sm:p-2 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          )})}
        </ul>

        <div className="border-t border-sky-200 dark:border-amber-700 mt-4 sm:mt-6 pt-4 sm:pt-6 flex justify-between items-center">
          <span className="text-amber-900/80 dark:text-sky-100/80 text-sm sm:text-base font-medium">Total Amount</span>
          <span className="font-bold text-xl sm:text-2xl text-amber-950 dark:text-sky-50">
            ₹{totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
