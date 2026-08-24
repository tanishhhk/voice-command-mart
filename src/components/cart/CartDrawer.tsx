"use client";

import React, { useMemo } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShopping } from '@/context/ShoppingContext';
import { products } from '@/data/products';
import { calculateItemPrice } from '@/utils/pricing';

export default function CartDrawer() {
  const { isCartOpen, toggleCart, state, dispatch } = useShopping();

  const totalPrice = useMemo(() => {
    return state.items.reduce((acc, item) => {
      const product = products.find(p => p.name === item.name);
      return acc + calculateItemPrice(product, item.quantity, item.unit || "pc");
    }, 0);
  }, [state.items]);

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={toggleCart}
      />
      
      <div className="fixed inset-y-0 right-0 w-full sm:max-w-md md:w-[450px] bg-white dark:bg-black shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-500" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
          </div>
          <button 
            onClick={toggleCart}
            className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-6">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 space-y-3 sm:space-y-4 p-4 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Your cart is empty</p>
              <p className="text-xs sm:text-sm">Start adding items with your voice!</p>
            </div>
          ) : (
            <div className="bg-[#E1F5FE] dark:bg-[#3E2723] rounded-2xl border border-[#B3E5FC] dark:border-[#3E2723] overflow-hidden shadow-lg p-4 sm:p-6">
              <div className="border-b border-[#B3E5FC] dark:border-[#3E2723] pb-3 sm:pb-4 mb-3 sm:mb-4">
                <h3 className="font-bold text-lg sm:text-xl text-[#3E2723] dark:text-[#E1F5FE] tracking-wide">Shopping Bill</h3>
              </div>
              
              <ul className="space-y-3 sm:space-y-4">
                {state.items.map((item, index) => {
                  const product = products.find(p => p.name === item.name);
                  const itemTotal = calculateItemPrice(product, item.quantity, item.unit || "pc");
                  
                  return (
                    <li key={index} className="flex items-center justify-between gap-2 group">
                      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-sm sm:text-base md:text-lg text-[#3E2723] dark:text-[#E1F5FE] truncate">
                            {item.name}
                          </span>
                          <span className="text-amber-800/70 dark:text-[#E1F5FE]/70 text-xs sm:text-sm font-medium">
                            {item.quantity} {item.unit || (product?.quantity && !product.quantity.includes('1') ? product.quantity : '')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                        <span className="font-bold text-[#3E2723] dark:text-[#E1F5FE] text-sm sm:text-base md:text-lg min-w-[60px] sm:w-24 text-right">
                          ₹{itemTotal.toFixed(2)}
                        </span>
                        
                        <button 
                          onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.name })}
                          className="p-1.5 sm:p-2 text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#B3E5FC] dark:border-[#3E2723]">
                <div className="flex justify-between items-center mb-2 sm:mb-6">
                  <span className="text-base sm:text-lg font-bold text-[#3E2723] dark:text-[#E1F5FE]">Total Bill</span>
                  <span className="text-xl sm:text-2xl font-black text-[#3E2723] dark:text-[#E1F5FE]">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-emerald-600/20">
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
