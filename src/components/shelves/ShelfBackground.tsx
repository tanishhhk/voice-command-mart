"use client";

import { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
import { products } from "@/data/products";
import { Product } from "@/types/product";
import ProductPlaceholder from "@/components/products/ProductPlaceholder";
import ProductHoverCard from "@/components/products/ProductHoverCard";
import { VoiceAssistant } from "../VoiceAssistant";
import OffersBanner from "../OffersBanner";
import { ShoppingList } from "@/components/ShoppingList";
import ShelfRow from "./ShelfRow";
import { getProductShape } from "@/lib/productShape";
import { useShopping } from "@/context/ShoppingContext";
import { isProductRunningLow, getRunningLowProducts } from "@/lib/recommendationEngine";
import { Plus, AlertCircle, ShoppingCart } from "lucide-react";

/* ── Screen Width Hook ───────────────────────────────────────── */
function useResponsiveScreen() {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const update = () => {
            const width = window.innerWidth;
            setIsMobile(width < 640);
            setIsTablet(width >= 640 && width < 1024);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return { isMobile, isTablet };
}

/* ── Helpers ─────────────────────────────────────────────────── */

function byCategory(category: Product["category"]) {
    return products.filter((p) => p.category === category);
}

function chunkArray<T>(array: T[], size: number): T[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

const FRIDGE_ITEMS_PER_ROW = 5;
const SHELF_ITEMS_PER_ROW = 7;

/* ── Product on Shelf ─────────────────────────────────────────── */
interface ShelfProductProps {
    product: Product;
    index: number;
    totalInRow?: number;
    isTopRow?: boolean;
    isBottomRow?: boolean;
    onClick?: (product: Product) => void;
    dropShadow?: string;
    scale?: number;
}

function ShelfProduct({ 
    product, 
    index, 
    totalInRow = 7, 
    isTopRow = false, 
    isBottomRow = false, 
    onClick, 
    dropShadow, 
    scale 
}: ShelfProductProps) {
    const shape = getProductShape(product);
    const [isHovered, setIsHovered] = useState(false);

    const { highlightedItem, searchResults, state, dispatch } = useShopping();
    const isContextHighlighted = highlightedItem?.productId === product.id;
    const isSearchActive = state.searchQuery.term || state.searchQuery.brand || state.searchQuery.maxPrice;
    const isSearchResult = searchResults.includes(product.id);
    const badgeQuantity = isContextHighlighted ? highlightedItem.badgeQuantity : undefined;
    const shouldStack = !["Drinks", "Dairy", "Vegetables", "Fruits"].includes(product.category);
    const isLowStock = isProductRunningLow(product.id);

    // Smart alignment: right half of shelf/fridge items pop hover card to the left, left half pop to the right
    const isRightHalf = index >= Math.ceil(totalInRow / 2) || (totalInRow <= 5 && index >= 3) || (totalInRow <= 3 && index >= 2);
    const cardAlign = isRightHalf ? "left" : "right";

    return (
        <div
            className="relative transition-all duration-500"
            style={{ 
                zIndex: isHovered ? 200 : 10, 
                cursor: "pointer",
                opacity: isSearchActive && !isSearchResult ? 0.25 : 1,
                filter: isSearchActive && !isSearchResult ? 'grayscale(100%) blur(1px)' : 'none'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-product-id={product.id}
            data-product-name={product.name}
            onClick={() => onClick?.(product)}
        >
            {/* Tilted Running Low Badge with Quick-Add Plus Button */}
            {isLowStock && (
                <div 
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch({
                            type: "ADD_ITEM",
                            payload: {
                                name: product.name,
                                category: product.category,
                                quantity: 1,
                                unit: product.quantity || "1 pc"
                            }
                        });
                    }}
                    className="absolute -top-2 -left-1.5 z-40 flex items-center gap-0.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded shadow-md -rotate-6 transition-transform hover:scale-110 active:scale-95 cursor-pointer border border-white/40"
                    title="Running low based on your past consumption! Click to add."
                >
                    <span>LOW</span>
                    <Plus className="w-2.5 h-2.5 stroke-[3]" />
                </div>
            )}

            <div style={{
                ...(dropShadow ? { filter: dropShadow } : {}),
                ...(scale ? { transform: `scale(${scale})` } : {})
            }}>
                {shouldStack && (
                    <div className="absolute z-0" style={{ transform: "translate(6px, -14px) scale(0.95)", opacity: 0.85, filter: "brightness(0.7)" }}>
                        <ProductPlaceholder
                            type={shape.type}
                            chipVariant={shape.chipVariant}
                            cerealVariant={shape.cerealVariant}
                            highlighted={false}
                            imageUrl={product.image}
                        />
                    </div>
                )}
                <div className="relative z-10 group/product">
                    <ProductPlaceholder
                        type={shape.type}
                        chipVariant={shape.chipVariant}
                        cerealVariant={shape.cerealVariant}
                        badgeQuantity={badgeQuantity}
                        highlighted={isContextHighlighted || isSearchResult}
                        imageUrl={product.image}
                    />
                    {/* Instant Add to Cart Plus Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch({
                                type: "ADD_ITEM",
                                payload: {
                                    name: product.name,
                                    category: product.category,
                                    quantity: 1,
                                    unit: product.quantity || "1 pc"
                                }
                            });
                        }}
                        className="absolute -top-1.5 -left-1.5 z-50 bg-emerald-500 hover:bg-emerald-400 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 opacity-90 sm:opacity-0 sm:group-hover/product:opacity-100 border-2 border-white/20 dark:border-[#080b11]"
                        title="Add to cart"
                    >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                </div>
            </div>
            {isHovered && (
                <ProductHoverCard 
                    product={product} 
                    align={cardAlign} 
                    isTopRow={isTopRow} 
                    isBottomRow={isBottomRow} 
                />
            )}
        </div>
    );
}

/* ── Fridge chunk height ──────────────────────────────────────── */
function getChunkHeight(chunk: Product[], isMobile: boolean): number {
    let hasTallBottle = false;
    let hasMedium = false;
    let hasPacket = false;

    chunk.forEach(p => {
        const url = p.image || "";
        const isTall = url.includes('/drinks/') ||
            url.includes('dairy_4.png') || url.includes('dairy_5.png') ||
            url.includes('dairy_6.png') || url.includes('dairy_7.png') ||
            url.includes('dairy_8.png') || url.includes('dairy_17.png');
        const isMedium = url.includes('dairy_18.png') || url.includes('dairy_9.png') || url.includes('dairy_10.png');
        const isPacketCheck = url.includes('packets_');

        if (isTall) hasTallBottle = true;
        if (isMedium) hasMedium = true;
        if (isPacketCheck) hasPacket = true;
    });

    if (isMobile) {
        if (hasPacket) return 120;
        if (hasTallBottle) return 165;
        if (hasMedium) return 150;
        return 105;
    }

    if (hasPacket) return 140;
    if (hasTallBottle) return 190;
    if (hasMedium) return 175;
    return 120;
}

/* ── Fridge (Refrigerated) ────────────────────────────────────── */
function FridgeSection() {
    const { isMobile, isTablet } = useResponsiveScreen();
    const fridgeCols = isMobile ? 3 : (isTablet ? 4 : FRIDGE_ITEMS_PER_ROW);
    const packetsCols = isMobile ? 3 : (isTablet ? 3 : 4);

    const dairyChunks = chunkArray(byCategory("Dairy"), fridgeCols);
    const drinkChunks = chunkArray(byCategory("Drinks"), fridgeCols);
    const packetsChunks = chunkArray(byCategory("Packets"), packetsCols);

    // Insert packets after the 2nd shelf
    const itemChunks = [
        ...dairyChunks.slice(0, isMobile ? 3 : 2),
        ...packetsChunks,
        ...dairyChunks.slice(isMobile ? 3 : 2),
        ...drinkChunks
    ];

    return (
        <div className="w-full mb-4 sm:mb-6">
            {/* Fridge outer frame */}
            <div style={{
                borderRadius: isMobile ? 20 : 28,
                background: "linear-gradient(145deg, var(--fridge-outer-start) 0%, var(--fridge-outer-mid1) 15%, var(--fridge-outer-mid2) 50%, var(--fridge-outer-end) 100%)",
                boxShadow: "0 40px 80px -15px rgba(0,10,20,0.6), 0 20px 40px -10px rgba(0,10,20,0.4), inset 0 2px 12px rgba(255,255,255,0.4), inset 0 -4px 15px rgba(0,30,60,0.4)",
                padding: isMobile ? "8px" : "12px",
            }}>
                <div
                    style={{
                        borderRadius: isMobile ? 12 : 16,
                        background: "var(--fridge-inner)",
                        border: "2px solid var(--fridge-border)",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                {/* Top header bar */}
                <div style={{
                    height: isMobile ? 32 : 38,
                    background: "linear-gradient(180deg, var(--fridge-header-start) 0%, var(--fridge-header-end) 100%)",
                    borderBottom: "1px solid var(--fridge-glass-border-bottom)",
                    borderTopLeftRadius: isMobile ? 10 : 14,
                    borderTopRightRadius: isMobile ? 10 : 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: isMobile ? 10 : 14,
                    paddingRight: isMobile ? 10 : 14,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span className={montserrat.className} style={{
                            fontSize: isMobile ? 12 : 15,
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            color: "var(--fridge-header-text)",
                        }}>REFRIGERATED</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: "#22cc44",
                            boxShadow: "0 0 6px #22cc44",
                        }} />
                        <span style={{ fontSize: isMobile ? 9 : 10, color: "#597c9c", fontWeight: 500 }}>2–6°C</span>
                    </div>
                </div>

                {/* Fridge interior base */}
                <div style={{
                    background: "linear-gradient(180deg, var(--fridge-inner) 0%, var(--fridge-inner-end) 100%)",
                    position: "relative",
                    boxShadow: "inset 0 25px 60px var(--fridge-shadow)", 
                }}>
                    
                    {/* Vertical panels on back wall */}
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                        background: "repeating-linear-gradient(90deg, transparent 0%, transparent 12.3%, var(--fridge-line-color) 12.3%, var(--fridge-line-color) 12.5%)",
                        zIndex: 1,
                    }} />

                    {/* Inner side walls */}
                    <div style={{
                        position: "absolute", top: 0, left: 0, bottom: 0, width: isMobile ? 30 : 60,
                        background: "linear-gradient(90deg, rgba(0,40,80,0.05) 0%, transparent 100%)",
                        zIndex: 5,
                    }} />
                    <div style={{
                        position: "absolute", top: 0, right: 0, bottom: 0, width: isMobile ? 30 : 60,
                        background: "linear-gradient(270deg, rgba(0,40,80,0.05) 0%, transparent 100%)",
                        zIndex: 5,
                    }} />

                    {/* Shelf rows */}
                    <div style={{ paddingTop: isMobile ? 18 : 30 }}>
                        {itemChunks.map((chunk, chunkIdx) => (
                            <div
                                key={`fridge-chunk-${chunkIdx}`}
                                style={{
                                    position: "relative",
                                    height: getChunkHeight(chunk, isMobile),
                                    paddingBottom: isMobile ? 8 : 12,
                                }}
                            >
                                <div style={{
                                    position: "absolute",
                                    bottom: isMobile ? 8 : 12,
                                    left: 0,
                                    right: 0,
                                    height: isMobile ? "calc(100% - 8px)" : "calc(100% - 12px)",
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "center",
                                    gap: isMobile ? 4 : 8,
                                    paddingLeft: isMobile ? 6 : 16,
                                    paddingRight: isMobile ? 6 : 16,
                                }}>
                                    {chunk.map((product, i) => (
                                        <div key={`fridge-${product.id}`} style={{ 
                                            minWidth: 0, 
                                            flexShrink: 1, 
                                            position: "relative",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-end",
                                            alignItems: "center"
                                        }}>
                                            {/* Glow on back wall */}
                                            <div style={{
                                                position: "absolute",
                                                top: chunkIdx === 0 ? -30 : 0,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: "150%",
                                                height: chunkIdx === 0 ? "calc(100% + 30px)" : "100%",
                                                background: "radial-gradient(ellipse at top, var(--fridge-glow-start) 0%, var(--fridge-glow-mid) 50%, transparent 80%)",
                                                pointerEvents: "none",
                                                zIndex: 2,
                                            }} />
                                            <ShelfProduct 
                                                product={product} 
                                                index={i} 
                                                totalInRow={chunk.length}
                                                isTopRow={chunkIdx === 0}
                                                isBottomRow={chunkIdx === itemChunks.length - 1}
                                                dropShadow="drop-shadow(0px 8px 12px rgba(0,30,60,0.15))" 
                                                scale={isMobile ? 0.82 : 1}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Frosted Glass Shelf */}
                                {chunkIdx < itemChunks.length - 1 && (
                                    <div style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        zIndex: 20,
                                    }}>
                                        <div style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            right: 0,
                                            height: 30,
                                            background: "linear-gradient(180deg, var(--fridge-shadow) 0%, transparent 100%)",
                                            zIndex: -1,
                                            pointerEvents: "none",
                                        }} />
                                        
                                        <div style={{
                                            height: isMobile ? 8 : 12,
                                            background: "linear-gradient(180deg, var(--fridge-glass-start) 0%, var(--fridge-glass-end) 100%)",
                                            borderTop: "1px solid rgba(255,255,255,0.4)",
                                            borderBottom: "2px solid var(--fridge-glass-border-bottom)",
                                            backdropFilter: "blur(4px)",
                                            boxShadow: "0 10px 20px var(--fridge-shadow)",
                                        }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Bottom tray for last row */}
                    <div style={{
                        position: "relative",
                        height: isMobile ? 8 : 12,
                        background: "linear-gradient(180deg, #1f252e 0%, #0d1014 100%)",
                        borderTop: "1px solid #3c4656",
                        borderBottom: "2px solid #000000",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.95)",
                        zIndex: 20,
                    }} />
                </div>

                {/* Bottom feet */}
                <div style={{
                    height: 8,
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    paddingLeft: "20%",
                    paddingRight: "20%",
                    marginTop: "-10px",
                    position: "relative",
                    zIndex: -1,
                }}>
                    {[0, 1].map(i => (
                        <div key={i} style={{
                            width: isMobile ? 20 : 30, height: 10,
                            background: "linear-gradient(180deg, #14161a 0%, #0a0b0d 100%)",
                            borderRadius: "0 0 6px 6px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.8)"
                        }} />
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
}

/* ── Produce Section (wooden crate cubbies) ─────────────────── */
function ProduceSection({ category, title }: { category: Product["category"], title: string }) {
    const vegProducts = byCategory(category);
    if (vegProducts.length === 0) return null;

    const { isMobile, isTablet } = useResponsiveScreen();
    const { dispatch } = useShopping();
    const runningLowItems = getRunningLowProducts();
    const cols = isMobile ? 4 : (isTablet ? 5 : 7);
    const cubbyHeight = isMobile ? 115 : (isTablet ? 128 : 140);
    const productScale = isMobile ? 0.78 : (isTablet ? 0.85 : 0.9);

    const rows = chunkArray(vegProducts.slice(0, 28), cols);

    const handleAddAllRunningLow = () => {
        runningLowItems.forEach(({ product }) => {
            dispatch({
                type: "ADD_ITEM",
                payload: {
                    name: product.name,
                    category: product.category,
                    quantity: 1,
                    unit: product.quantity || "1 pc"
                }
            });
        });
    };

    return (
        <div className="w-full mb-3 sm:mb-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-1.5 sm:px-3 sm:py-2">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
                    <span className="font-extrabold text-sm sm:text-base tracking-wider uppercase text-[#3d2314] dark:text-[#f4ebd0]">
                        {title}
                    </span>

                    {/* Running Low Smart Alert beside Fresh Vegetables */}
                    {title === "Fresh Vegetables" && runningLowItems.length > 0 && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/90 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/60 text-amber-950 dark:text-amber-100 text-xs shadow-xs">
                            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                            <span className="font-bold hidden md:inline text-amber-900 dark:text-amber-300">Running Low:</span>
                            <span className="font-semibold truncate max-w-[200px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[550px]">
                                {runningLowItems.map(i => i.product.name).join(", ")}
                            </span>
                            <button
                                onClick={handleAddAllRunningLow}
                                className="ml-1.5 px-2.5 py-1 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-black text-[10px] sm:text-[11px] shadow-xs transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
                            >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>Add All</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Outer container */}
            <div style={{
                background: "#0c0d0f",
                border: "1px solid #1c2026",
                borderRadius: isMobile ? 12 : 16,
                overflow: "visible",
                boxShadow: "0 40px 80px -15px rgba(0,10,20,0.6), 0 20px 40px -10px rgba(0,10,20,0.4)",
            }}>
                {rows.map((rowItems, rowIdx) => (
                    <div key={`veg-row-${rowIdx}`} style={{ position: "relative" }}>
                        {/* Row of cubbies */}
                        <div style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                        }}>
                            {Array.from({ length: cols }).map((_, colIdx) => {
                                const p = rowItems[colIdx];
                                return (
                                    <div
                                        key={colIdx}
                                        style={{
                                            width: `${100 / cols}%`,
                                            position: "relative",
                                            height: cubbyHeight,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "flex-end",
                                            borderRight: colIdx < cols - 1 ? "2px solid #1c110a" : "none",
                                            borderBottom: rowIdx < rows.length - 1 ? "2px solid #1c110a" : "none",
                                            background: "repeating-linear-gradient(180deg, #3d2314 0px, #3d2314 18px, #29160a 18px, #29160a 20px)",
                                            boxShadow: "inset 0 25px 40px rgba(0,0,0,0.95), inset 4px 0 15px rgba(0,0,0,0.8)",
                                            padding: isMobile ? "0 4px 8px 4px" : "0 8px 12px 8px",
                                            overflow: "visible",
                                        }}
                                    >
                                        {/* Flat strip light */}
                                        <div style={{
                                            position: "absolute",
                                            top: 0,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            width: isMobile ? 22 : 32,
                                            height: 2,
                                            background: "#fff9e6",
                                            boxShadow: "0 1px 8px 2px rgba(255, 210, 150, 0.9)",
                                            borderRadius: "0 0 4px 4px",
                                            zIndex: 10,
                                        }} />
                                        
                                        {/* Soft glow on back wall */}
                                        <div style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: "radial-gradient(ellipse at top, rgba(255, 210, 150, 0.25) 0%, rgba(255, 210, 150, 0) 70%)",
                                            pointerEvents: "none",
                                            zIndex: 1,
                                        }} />

                                        {p && (
                                            <>
                                                {/* Floor contact shadow */}
                                                <div style={{
                                                    position: "absolute",
                                                    bottom: 4,
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    width: "60%",
                                                    height: 10,
                                                    background: "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 70%)",
                                                    zIndex: 2,
                                                }} />

                                                {/* Product image */}
                                                <div style={{ position: "relative" }}>
                                                    <ShelfProduct 
                                                        product={p} 
                                                        index={colIdx} 
                                                        totalInRow={cols} 
                                                        isTopRow={rowIdx === 0}
                                                        isBottomRow={rowIdx === rows.length - 1}
                                                        dropShadow="drop-shadow(0px 8px 12px rgba(0,0,0,0.8))" 
                                                        scale={productScale} 
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Category Shelf Component ────────────────────────────────── */
function CategoryShelfSection({ 
    category, 
    productsList, 
    itemsPerRow = SHELF_ITEMS_PER_ROW, 
    isLastCategory = false 
}: { 
    category: string; 
    productsList: Product[]; 
    itemsPerRow?: number; 
    isLastCategory?: boolean; 
}) {
    const { isMobile, isTablet } = useResponsiveScreen();

    if (productsList.length === 0) return null;

    let effectiveItemsPerRow = itemsPerRow;
    if (isMobile) {
        effectiveItemsPerRow = category === "Packets" ? 3 : (category === "Cereals" ? 3 : 3);
    } else if (isTablet) {
        effectiveItemsPerRow = category === "Packets" ? 3 : (category === "Cereals" ? 4 : 5);
    }

    let chunks = chunkArray(productsList, effectiveItemsPerRow);
    
    // Custom logic to support exact rows for Toiletries on desktop
    if (category === "Toiletries" && !isMobile && !isTablet) {
        chunks = [
            productsList.slice(0, 3), // Lux shelf (3 items)
            productsList.slice(3, 8), // Axe shelf + Gillette (5 items)
            productsList.slice(8, 13), // Hair & Skin (5 items)
            productsList.slice(13, 17), // Face wash (4 items)
            productsList.slice(17, 21) // Dental (4 items)
        ];
    }

    // Dynamic height calculation
    const getRowHeight = (chunk: Product[], cat: string, idx: number) => {
        const hasBottle = chunk.some(p => p.image?.includes('/drinks/') || p.image?.includes('dairy_'));
        const hasAtta = chunk.some(p => p.image?.includes('random_7.png'));
        const hasExtraTall = chunk.some(p => p.image?.includes('toiletries_') || p.image?.includes('random_'));
        
        const hasTallCleaning = chunk.some(p => p.image?.includes('cleaning_1.png') || p.image?.includes('cleaning_7.png') || p.image?.includes('cleaning_8.png') || p.image?.includes('cleaning_9.png') || p.image?.includes('cleaning_2.png') || p.image?.includes('cleaning_10.png') || p.image?.includes('cleaning_11.png') || p.image?.includes('cleaning_12.png'));
        const hasShortCleaning = chunk.some(p => p.image?.includes('cleaning_3.png') || p.image?.includes('cleaning_4.png') || p.image?.includes('cleaning_5.png') || p.image?.includes('cleaning_6.png'));

        const hasMedium = chunk.some(p => p.image?.includes('noodles_'));
        const hasSnacks = chunk.some(p => p.image?.includes('snacks_'));
        const hasBaby = chunk.some(p => p.image?.includes('baby_'));
        const hasSmall = chunk.some(p => p.image?.includes('spreads_') || p.image?.includes('chocolates_'));
        const hasCereals = chunk.some(p => p.image?.includes('cereals_'));
        
        let height = 165;
        if (hasAtta) height = isMobile ? 220 : 270;
        else if (hasTallCleaning) height = isMobile ? 200 : 240;
        else if (hasBottle) height = isMobile ? 170 : 195;
        else if (hasExtraTall) height = isMobile ? 180 : 215;
        else if (hasCereals) height = isMobile ? 175 : 205;
        else if (hasMedium) height = isMobile ? 160 : 185;
        else if (hasShortCleaning) height = isMobile ? 140 : 160;
        else if (hasSnacks) height = isMobile ? 130 : 145;
        else if (hasBaby) height = isMobile ? 100 : 115;
        else if (hasSmall) height = isMobile ? 125 : 140;

        if (idx === 0) {
            if (cat === "Snacks" || cat === "Spreads" || cat === "Cleaning") {
                height += 20;
            } else if (cat === "Toiletries") {
                height -= 40;
            } else if (cat === "Baby Care") {
                height -= 35;
            }
        }
        return height;
    };

    const iconMap: Record<string, string> = {
        "Baby Care": "🧴",
        "Cereals": "🥣",
        "Chocolates": "🍫",
        "Snacks": "🍿",
        "Spreads": "🫙",
        "Noodles": "🍜",
        "Cup Noodles": "🍜",
        "Toiletries": "🪥",
        "Cleaning": "🧹",
        "Miscellaneous": "🛒",
    };

    return (
        <div key={category} style={{
            marginBottom: category === "Baby Care" ? 8 : (isMobile ? 16 : 28),
        }}>
            {chunks.map((chunk, idx) => {
                const isLastShelf = isLastCategory && idx === chunks.length - 1;
                return (
                    <ShelfRow
                        key={`${category}-${idx}`}
                        label={idx === 0 ? category.toUpperCase() : ""}
                        icon={idx === 0 ? iconMap[category] : undefined}
                        height={getRowHeight(chunk, category, idx)}
                        hasLight={!isLastShelf}
                    >
                        <div style={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            gap: isMobile ? 6 : (isTablet ? 10 : 14),
                            padding: isMobile ? "0 4px" : "0 12px",
                        }}>
                            {chunk.map((product, i) => (
                                <div key={`shelf-${product.id}`} style={{ minWidth: 0, flexShrink: 1 }}>
                                    <ShelfProduct 
                                        product={product} 
                                        index={i} 
                                        totalInRow={chunk.length}
                                        isTopRow={idx === 0}
                                        isBottomRow={idx === chunks.length - 1}
                                        dropShadow="drop-shadow(0px 12px 8px rgba(0,0,0,0.5)) drop-shadow(0px 20px 20px rgba(0,0,0,0.3))" 
                                        scale={isMobile ? 0.85 : 1}
                                    />
                                </div>
                            ))}
                        </div>
                    </ShelfRow>
                );
            })}
        </div>
    );
}

/* ── Main Component ──────────────────────────────────────────── */
export default function ShelfBackground() {
    const { state } = useShopping();
    const rightCategories = [
        "Cereals", "Chocolates", "Snacks", "Spreads",
        "Noodles", "Cup Noodles", "Miscellaneous",
    ];

    const leftCategories = ["Baby Care", "Toiletries", "Cleaning"];

    return (
        <div className="w-full px-2 sm:px-4 md:px-6 pt-2 pb-24 box-border max-w-full">
            {/* ── TOP HERO SECTION: Mic + Command Center + Offers Banner ── */}
            <div className="w-full mb-6 sm:mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
                {/* Left & Center: Mic + Command Center */}
                <div className="flex-1 w-full min-w-0">
                    <VoiceAssistant />
                </div>
                {/* Right: Transitioning Offer Banner Card */}
                <div className="w-full lg:w-[520px] xl:w-[580px] flex-shrink-0">
                    <OffersBanner />
                </div>
            </div>

            {/* ── STORE SHELF COLUMNS (LEFT: FRIDGE + MISC / RIGHT: PRODUCE + PANTRY) ── */}
            <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-8 items-stretch lg:items-start">
                {/* LEFT COLUMN (38% on desktop) */}
                <div className="w-full lg:w-[38%] flex-shrink-0 flex flex-col gap-4 sm:gap-6">
                    <FridgeSection />
                    {leftCategories.map((cat, idx) => 
                        <CategoryShelfSection
                            key={cat}
                            category={cat}
                            productsList={byCategory(cat as Product["category"])}
                            itemsPerRow={4}
                            isLastCategory={idx === leftCategories.length - 1}
                        />
                    )}
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex-1 w-full min-w-0 flex flex-col gap-3 sm:gap-4">
                    {/* Produce at top */}
                    <ProduceSection category="Vegetables" title="Fresh Vegetables" />
                    <ProduceSection category="Fruits" title="Fresh Fruits" />

                    {/* Other food categories */}
                    {rightCategories.map((cat, idx) =>
                        <CategoryShelfSection
                            key={cat}
                            category={cat}
                            productsList={byCategory(cat as Product["category"])}
                            itemsPerRow={cat === "Packets" ? 4 : (cat === "Cereals" ? 5 : SHELF_ITEMS_PER_ROW)}
                            isLastCategory={idx === rightCategories.length - 1}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
