"use client";

import React, { useMemo } from 'react';
import { useShopping } from '@/context/ShoppingContext';
import { generateSuggestions } from '@/lib/recommendationEngine';
import { Lightbulb, PlusCircle, Leaf, History, ArrowRightLeft } from 'lucide-react';
import { PRODUCT_DB } from '@/data/productDatabase';

export const SuggestionsPanel = () => {
  const { state, dispatch } = useShopping();

  const suggestions = useMemo(() => generateSuggestions(state), [state]);

  if (suggestions.length === 0) return null;

  const handleAddSuggestion = (suggestionName: string) => {
    const product = PRODUCT_DB.find(p => p.name === suggestionName);
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        name: suggestionName,
        category: product?.category || 'Other',
        quantity: 1,
        unit: product?.defaultUnit || 'item'
      }
    });
  };

  const getIcon = (reason: string) => {
    switch (reason) {
      case 'seasonal': return <Leaf className="w-4 h-4 text-emerald-400" />;
      case 'history': return <History className="w-4 h-4 text-blue-400" />;
      case 'substitute': return <ArrowRightLeft className="w-4 h-4 text-purple-400" />;
      default: return <Lightbulb className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <h2 className="text-sm font-medium text-gray-300 tracking-wide uppercase">Smart Suggestions</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.id} 
            className="flex flex-col justify-between p-4 bg-gray-800/80 hover:bg-gray-700/80 rounded-xl border border-gray-700 transition-colors cursor-pointer group"
            onClick={() => handleAddSuggestion(suggestion.name)}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="mt-0.5 bg-gray-900 p-1.5 rounded-lg border border-gray-700 group-hover:border-gray-500 transition-colors">
                {getIcon(suggestion.reason)}
              </div>
              <p className="text-sm text-gray-300 leading-snug">
                {suggestion.message}
              </p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-700/50">
              <span className="font-semibold text-white">{suggestion.name}</span>
              <button 
                className="text-emerald-400 flex items-center gap-1 text-sm font-medium hover:text-emerald-300"
              >
                <PlusCircle className="w-4 h-4" /> Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
