"use client";

import { useState, useEffect } from "react";
import {
    Search,
    List,
    Sparkles,
    Tag,
    ShoppingCart,
    Moon,
    Sun,
    Globe
} from "lucide-react";

import { useShopping } from "@/context/ShoppingContext";
import { products } from "@/data/products";

const LANGUAGES = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi (हिन्दी)" },
    { code: "bn", name: "Bengali (বাংলা)" },
    { code: "te", name: "Telugu (తెలుగు)" },
    { code: "mr", name: "Marathi (मराठी)" },
    { code: "ta", name: "Tamil (தமிழ்)" },
    { code: "ur", name: "Urdu (اردو)" },
    { code: "gu", name: "Gujarati (ગુજરાતી)" },
    { code: "kn", name: "Kannada (ಕನ್ನಡ)" },
    { code: "ml", name: "Malayalam (മലയാളം)" },
    { code: "or", name: "Odia (ଓଡ଼ିଆ)" },
    { code: "pa", name: "Punjabi (ਪੰਜਾਬੀ)" },
    { code: "as", name: "Assamese (অসমীয়া)" },
];

import { X } from "lucide-react";

function SearchResultsPopup({ term, isVisible, onClose }: { term: string; isVisible: boolean; onClose: () => void }) {
    const { dispatch } = useShopping();
    if (!isVisible || !term) return null;

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) || 
        p.category.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 8);

    const handleSelectProduct = (product: typeof products[0]) => {
        dispatch({
            type: "ADD_ITEM",
            payload: { name: product.name, category: product.category, quantity: 1, unit: product.quantity || "1 pc" }
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-200 p-4 sm:p-8 border border-gray-200 dark:border-gray-800">
                <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
                    <X size={20} className="sm:w-6 sm:h-6" />
                </button>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 pr-10 sm:pr-12">
                    Search Results for &quot;{term}&quot;
                </h2>
                
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                        {filtered.map(product => (
                            <div 
                                key={product.id} 
                                onClick={() => handleSelectProduct(product)}
                                className="group relative flex flex-col items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-transparent hover:border-emerald-500/40 hover:shadow-lg transition-all cursor-pointer"
                            >
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    loading="lazy"
                                    className="w-16 h-16 sm:w-24 sm:h-24 object-contain mb-2 sm:mb-4 group-hover:scale-110 transition-transform" 
                                />
                                <h3 className="text-xs sm:text-sm font-semibold text-center mb-1 text-gray-900 dark:text-gray-100 line-clamp-2">{product.name}</h3>
                                <p className="text-emerald-600 font-bold text-xs sm:text-sm">₹{product.price}</p>
                                <span className="mt-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to Add
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 sm:py-12 text-center text-gray-500 text-base sm:text-lg">
                        No products found matching &quot;{term}&quot;
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Navbar() {
    const [isDark, setIsDark] = useState(false);
    const [selectedLang, setSelectedLang] = useState("en");
    const { toggleCart, dispatch, state } = useShopping();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalCartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

    // Sync input with search query from voice commands
    useEffect(() => {
        if (state.searchQuery?.term && state.searchQuery.term !== searchTerm) {
            setSearchTerm(state.searchQuery.term);
            setIsModalOpen(true);
        }
    }, [state.searchQuery?.term]);

    useEffect(() => {
        // Check if dark mode is set in localStorage or document
        if (document.documentElement.classList.contains("dark")) {
            setIsDark(true);
        }
        
        // Try to read language from Google Translate cookie if it exists
        const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
        if (match) {
            setSelectedLang(match[1]);
        }
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const handleLanguageChange = (langCode: string) => {
        setSelectedLang(langCode);
        if (langCode === "en") {
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + location.hostname;
        } else {
            document.cookie = `googtrans=/en/${langCode}; path=/;`;
            document.cookie = `googtrans=/en/${langCode}; path=/; domain=${location.hostname};`;
        }
        window.location.reload();
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchTerm(val);
        dispatch({
            type: "SET_SEARCH_QUERY",
            payload: { term: val }
        });
        if (val) setIsModalOpen(true);
    };

    return (
        <header className="w-full px-3 sm:px-6 md:px-12 pt-4 sm:pt-6 pb-2 sm:pb-3 relative z-50">
            <div className="flex items-center justify-between gap-y-3">
                {/* Brand / Logo */}
                <div className="flex-shrink-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-colors flex items-center">
                        <span style={{ color: "var(--ration-color)" }}>राशन</span>
                        <span style={{ color: "var(--house-color)" }}>House</span>
                    </h1>
                    <p className="text-xs sm:text-sm transition-colors" style={{ color: "var(--subtitle-color)" }}>
                        Voice Shopping Assistant
                    </p>
                </div>

                {/* Actions (Right) */}
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    {/* Theme Toggle */}
                    <button 
                        onClick={toggleTheme} 
                        aria-label="Toggle theme"
                        className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#071d15]/90 border border-emerald-500/40 text-white font-bold text-xs sm:text-sm shadow-sm hover:border-emerald-400 hover:scale-105 active:scale-95 transition-all"
                    >
                        {isDark ? (
                            <Sun size={15} className="text-amber-400 fill-amber-400" />
                        ) : (
                            <Moon size={15} className="text-indigo-300 fill-indigo-300" />
                        )}
                        <span className="font-semibold text-xs sm:text-sm">{isDark ? "Light" : "Dark"}</span>
                    </button>
                    
                    {/* Cart Button */}
                    <button 
                        onClick={toggleCart} 
                        aria-label="View Cart"
                        className="relative flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
                    >
                        <ShoppingCart size={16} className="text-white" />
                        <span className="font-bold">Cart</span>
                        {totalCartCount > 0 && (
                            <span className="ml-1 bg-white text-emerald-800 text-[10px] font-black rounded-full h-4.5 min-w-4.5 px-1.5 flex items-center justify-center shadow-xs">
                                {totalCartCount > 99 ? '99+' : totalCartCount}
                            </span>
                        )}
                    </button>

                    {/* Language Selector */}
                    <div className="relative flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#071d15]/90 border border-emerald-500/40 text-white font-bold text-xs sm:text-sm shadow-sm hover:border-emerald-400 transition-all">
                        <Globe size={15} className="text-emerald-400 flex-shrink-0" />
                        <select 
                            value={selectedLang}
                            aria-label="Select language"
                            onChange={(e) => handleLanguageChange(e.target.value)}
                            className="bg-transparent text-xs sm:text-sm outline-none cursor-pointer text-white font-bold appearance-none pr-3"
                        >
                            {LANGUAGES.map(lang => (
                                <option key={lang.code} value={lang.code} className="text-black bg-white dark:bg-gray-900 dark:text-gray-100">
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-2.5 text-emerald-400 text-[8px]">▼</span>
                    </div>
                </div>
            </div>

            <SearchResultsPopup 
                term={searchTerm} 
                isVisible={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </header>
    );
}