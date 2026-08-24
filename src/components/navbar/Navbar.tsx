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
    if (!isVisible || !term) return null;

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) || 
        p.category.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 8);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-200 p-8 border border-gray-200 dark:border-gray-800">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 pr-12">
                    Search Results for &quot;{term}&quot;
                </h2>
                
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filtered.map(product => (
                            <div key={product.id} className="group relative flex flex-col items-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-transparent hover:border-emerald-500/30 transition-all cursor-pointer">
                                <img src={product.image} alt={product.name} className="w-24 h-24 object-contain mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-sm font-semibold text-center mb-1 text-gray-900 dark:text-gray-100">{product.name}</h3>
                                <p className="text-emerald-600 font-bold">₹{product.price}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center text-gray-500 text-lg">
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
        <header className="w-full px-12 pt-8 pb-5 flex items-center justify-between relative z-50">
            {/* Left */}
            <div>
                <h1 className="text-4xl font-bold tracking-tight transition-colors flex items-center">
                    <span style={{ color: "var(--ration-color)" }}>राशन</span>
                    <span style={{ color: "var(--house-color)" }}>House</span>
                </h1>
                <p className="text-sm transition-colors" style={{ color: "var(--subtitle-color)" }}>
                    Voice Shopping Assistant
                </p>
            </div>

            {/* Middle: Search Bar */}
            <div className="w-80 mx-8 relative">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={20} className="text-gray-500 dark:text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && searchTerm) {
                                setIsModalOpen(true);
                            }
                        }}
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all text-base font-medium text-gray-900 dark:text-gray-100 shadow-sm"
                    />
                </div>
                <SearchResultsPopup term={searchTerm} isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>

            {/* Right */}
            <div className="flex items-center gap-8">
                <button onClick={toggleTheme} className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
                    {isDark ? <Sun size={22} /> : <Moon size={22} />}
                    <span className="text-xs font-medium">{isDark ? "Light" : "Dark"}</span>
                </button>
                
                <NavItem icon={<ShoppingCart size={22} />} label="Cart" onClick={toggleCart} />

                <div className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Globe size={22} className="pointer-events-none" />
                    <select 
                        value={selectedLang}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="bg-transparent text-xs outline-none cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition font-medium appearance-none text-center"
                        style={{ textAlignLast: "center" }}
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.code} value={lang.code} className="text-black dark:text-black">
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </header>
    );
}

function NavItem({
    icon,
    label,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}) {
    return (
        <button onClick={onClick} className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
            {icon}
            <span className="text-xs">{label}</span>
        </button>
    );
}