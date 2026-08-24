"use client";

import { useState } from "react";
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
    onClick?: (product: Product) => void;
    dropShadow?: string;
    scale?: number;
}

function ShelfProduct({ product, index, onClick, dropShadow, scale }: ShelfProductProps) {
    const shape = getProductShape(product);
    const [isHovered, setIsHovered] = useState(false);

    const { highlightedItem, searchResults, state } = useShopping();
    const isContextHighlighted = highlightedItem?.productId === product.id;
    const isSearchActive = state.searchQuery.term || state.searchQuery.brand || state.searchQuery.maxPrice;
    const isSearchResult = searchResults.includes(product.id);
    const badgeQuantity = isContextHighlighted ? highlightedItem.badgeQuantity : undefined;
    const shouldStack = !["Drinks", "Dairy", "Vegetables"].includes(product.category);

    return (
        <div
            className="relative transition-all duration-500"
            style={{ 
                zIndex: isHovered ? 50 : 10, 
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
                <div className="relative z-10">
                    <ProductPlaceholder
                        type={shape.type}
                        chipVariant={shape.chipVariant}
                        cerealVariant={shape.cerealVariant}
                        badgeQuantity={badgeQuantity}
                        highlighted={isContextHighlighted || isSearchResult}
                        imageUrl={product.image}
                    />
                </div>
            </div>
            {isHovered && <ProductHoverCard product={product} />}
        </div>
    );
}

/* ── Fridge chunk height ──────────────────────────────────────── */
function getChunkHeight(chunk: Product[]): number {
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

    // Tighter heights — products will clip against shelf naturally
    if (hasPacket) return 140;
    if (hasTallBottle) return 190;
    if (hasMedium) return 175;
    return 120;
}

/* ── Fridge (Refrigerated) ────────────────────────────────────── */
function FridgeSection() {
    const dairyChunks = chunkArray(byCategory("Dairy"), FRIDGE_ITEMS_PER_ROW);
    const drinkChunks = chunkArray(byCategory("Drinks"), FRIDGE_ITEMS_PER_ROW);
    const packetsChunks = chunkArray(byCategory("Packets"), 4); // 4 items per row so Masti drops down

    // Insert packets after the 2nd shelf (index 2)
    const itemChunks = [
        ...dairyChunks.slice(0, 2),
        ...packetsChunks,
        ...dairyChunks.slice(2),
        ...drinkChunks
    ];

    return (
        <div className="w-full" style={{ marginBottom: 24 }}>
            {/* Fridge outer frame — light metallic silver border */}
            <div style={{
                borderRadius: 28,
                background: "linear-gradient(145deg, var(--fridge-outer-start) 0%, var(--fridge-outer-mid1) 15%, var(--fridge-outer-mid2) 50%, var(--fridge-outer-end) 100%)", /* Adapts to light/dark mode */
                boxShadow: "0 40px 80px -15px rgba(0,10,20,0.6), 0 20px 40px -10px rgba(0,10,20,0.4), inset 0 2px 12px rgba(255,255,255,0.4), inset 0 -4px 15px rgba(0,30,60,0.4)",
                padding: "12px",
            }}>
                <div
                    style={{
                        borderRadius: 16,
                        background: "var(--fridge-inner)",
                        border: "2px solid var(--fridge-border)",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                {/* Top header bar — matches reference light bar with REFRIGERATED label */}
                <div style={{
                    height: 38,
                    background: "linear-gradient(180deg, var(--fridge-header-start) 0%, var(--fridge-header-end) 100%)",
                    borderBottom: "1px solid var(--fridge-glass-border-bottom)",
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: 14,
                    paddingRight: 14,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className={montserrat.className} style={{
                            fontSize: 15,
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            color: "var(--fridge-header-text)",
                        }}>REFRIGERATED</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{
                            width: 7, height: 7, borderRadius: "50%",
                            background: "#22cc44",
                            boxShadow: "0 0 6px #22cc44",
                        }} />
                        <span style={{ fontSize: 10, color: "#597c9c", fontWeight: 500 }}>2–6°C</span>
                    </div>
                </div>

                {/* Fridge interior base */}
                <div style={{
                    background: "linear-gradient(180deg, var(--fridge-inner) 0%, var(--fridge-inner-end) 100%)",
                    position: "relative",
                    boxShadow: "inset 0 25px 60px var(--fridge-shadow)", 
                }}>
                    
                    {/* Vertical panels on back wall - dynamic visibility via line color */}
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                        background: "repeating-linear-gradient(90deg, transparent 0%, transparent 12.3%, var(--fridge-line-color) 12.3%, var(--fridge-line-color) 12.5%)",
                        zIndex: 1,
                    }} />

                    {/* Inner side walls (subtle shadows on edges) */}
                    <div style={{
                        position: "absolute", top: 0, left: 0, bottom: 0, width: 60,
                        background: "linear-gradient(90deg, rgba(0,40,80,0.05) 0%, transparent 100%)",
                        zIndex: 5,
                    }} />
                    <div style={{
                        position: "absolute", top: 0, right: 0, bottom: 0, width: 60,
                        background: "linear-gradient(270deg, rgba(0,40,80,0.05) 0%, transparent 100%)",
                        zIndex: 5,
                    }} />

                    {/* Shelf rows */}
                    <div style={{ paddingTop: 30 }}>
                        {itemChunks.map((chunk, chunkIdx) => (
                            <div
                                key={`fridge-chunk-${chunkIdx}`}
                                style={{
                                    position: "relative",
                                    height: getChunkHeight(chunk),
                                    paddingBottom: 12, // Room for the solid shelf below
                                }}
                            >
                                <div style={{
                                    position: "absolute",
                                    bottom: 12, // Sit exactly on top of the solid shelf
                                    left: 0,
                                    right: 0,
                                    height: "calc(100% - 12px)",
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "center",
                                    gap: 8,
                                    paddingLeft: 16,
                                    paddingRight: 16,
                                }}>
                                    {chunk.map((product, i) => (
                                        <div key={`fridge-${product.id}`} style={{ 
                                            minWidth: 0, 
                                            flexShrink: 1, 
                                            position: "relative",
                                            height: "100%", // Full height so spotlight starts at ceiling
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-end",
                                            alignItems: "center"
                                        }}>
                                            {/* Soft Radial Glow on Back Wall from the shelf above */}
                                            <div style={{
                                                position: "absolute",
                                                top: chunkIdx === 0 ? -30 : 0,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: "150%", // Widen it slightly so the lights blend together nicer
                                                height: chunkIdx === 0 ? "calc(100% + 30px)" : "100%",
                                                background: "radial-gradient(ellipse at top, var(--fridge-glow-start) 0%, var(--fridge-glow-mid) 50%, transparent 80%)",
                                                pointerEvents: "none",
                                                zIndex: 2,
                                            }} />
                                            <ShelfProduct product={product} index={i} dropShadow="drop-shadow(0px 8px 12px rgba(0,30,60,0.15))" />
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
                                        {/* Back wall shadow cast by shelf to create depth */}
                                        <div style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            right: 0,
                                            height: 40,
                                            background: "linear-gradient(180deg, var(--fridge-shadow) 0%, transparent 100%)",
                                            zIndex: -1,
                                            pointerEvents: "none",
                                        }} />
                                        
                                        {/* Glass block shelf */}
                                        <div style={{
                                            height: 12,
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

                    {/* Bottom tray for last row — matches solid shelves */}
                    <div style={{
                        position: "relative",
                        height: 12,
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
                    marginTop: "-10px", // Pull up to stick to metallic frame
                    position: "relative",
                    zIndex: -1,
                }}>
                    {[0, 1].map(i => (
                        <div key={i} style={{
                            width: 30, height: 12,
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

    // 4 rows × 7 columns = 28 slots
    const rows = chunkArray(vegProducts.slice(0, 28), 7);

    return (
        <div className="w-full" style={{ marginBottom: 0 }}>
            {/* Header */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 12px 8px",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className={`${montserrat.className} dark:text-[#f4ebd0]`} style={{
                        fontSize: 15,
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--produce-header-color, #0f4c3a)", // Dark green in light mode
                        textShadow: "var(--produce-header-shadow, 1px 1px 0px #ffffff, -1px -1px 0px #ffffff, 1px -1px 0px #ffffff, -1px 1px 0px #ffffff)", // Solid white shadow
                    }}>{title}</span>
                </div>
            </div>

            {/* Outer container — dark framed panel matching reference */}
            <div style={{
                background: "#0c0d0f",
                border: "1px solid #1c2026",
                borderRadius: 16,
                overflow: "hidden",
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
                            {Array.from({ length: 7 }).map((_, colIdx) => {
                                const p = rowItems[colIdx];
                                return (
                                    <div
                                        key={colIdx}
                                        style={{
                                            width: "14.2857%", // exactly 1/7th width to align with full rows
                                            position: "relative",
                                            height: 140,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "flex-end",
                                            // Sleek dark dividers with subtle highlight
                                            borderRight: colIdx < 6 ? "2px solid #1c110a" : "none",
                                            borderBottom: rowIdx < rows.length - 1 ? "2px solid #1c110a" : "none",
                                            // Lighter premium wood slatted background
                                            background: "repeating-linear-gradient(180deg, #3d2314 0px, #3d2314 18px, #29160a 18px, #29160a 20px)",
                                            // Stronger 3D depth shadow
                                            boxShadow: "inset 0 25px 40px rgba(0,0,0,0.95), inset 4px 0 15px rgba(0,0,0,0.8)",
                                            padding: "0 8px 12px 8px",
                                            overflow: "visible",
                                        }}
                                    >
                                        {/* Flat strip light at top center */}
                                        <div style={{
                                            position: "absolute",
                                            top: 0,
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            width: 32,
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
                                                {/* Floor contact shadow to ground the vegetable */}
                                                <div style={{
                                                    position: "absolute",
                                                    bottom: 4, // lowered back since board is gone
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    width: "60%",
                                                    height: 12,
                                                    background: "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 70%)",
                                                    zIndex: 2,
                                                }} />

                                                {/* Product image with 3D drop shadow */}
                                                <div style={{
                                                    position: "relative",
                                                }}>
                                                    <ShelfProduct product={p} index={colIdx} dropShadow="drop-shadow(0px 8px 12px rgba(0,0,0,0.8))" scale={0.9} />
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

/* ── Category Renderer (right shelf) ─────────────────────────── */
function renderCategoryShelf(category: string, productsList: Product[], itemsPerRow = SHELF_ITEMS_PER_ROW, isLastCategory = false) {
    if (productsList.length === 0) return null;
    let chunks = chunkArray(productsList, itemsPerRow);
    
    // Custom logic to support exact rows for Toiletries
    if (category === "Toiletries") {
        chunks = [
            productsList.slice(0, 3), // Lux shelf (3 items)
            productsList.slice(3, 8), // Axe shelf + Gillette (5 items)
            productsList.slice(8, 13), // Hair & Skin (5 items)
            productsList.slice(13, 17), // Face wash (4 items)
            productsList.slice(17, 21) // Dental (4 items)
        ];
    }

    // Dynamic height: taller for tall products, shorter for small ones
    const getRowHeight = (chunk: Product[], cat: string, idx: number) => {
        const hasBottle = chunk.some(p => p.image?.includes('/drinks/') || p.image?.includes('dairy_'));
        const hasAtta = chunk.some(p => p.image?.includes('random_7.png'));
        const hasExtraTall = chunk.some(p => p.image?.includes('toiletries_') || p.image?.includes('random_'));
        
        // Differentiate tall cleaning bottles (Lizol, Harpic, etc) from short ones (Vim, Scotch, Surf Excel, Pril)
        const hasTallCleaning = chunk.some(p => p.image?.includes('cleaning_1.png') || p.image?.includes('cleaning_7.png') || p.image?.includes('cleaning_8.png') || p.image?.includes('cleaning_9.png') || p.image?.includes('cleaning_2.png') || p.image?.includes('cleaning_10.png') || p.image?.includes('cleaning_11.png') || p.image?.includes('cleaning_12.png'));
        const hasShortCleaning = chunk.some(p => p.image?.includes('cleaning_3.png') || p.image?.includes('cleaning_4.png') || p.image?.includes('cleaning_5.png') || p.image?.includes('cleaning_6.png'));

        const hasMedium = chunk.some(p => p.image?.includes('noodles_'));
        const hasSnacks = chunk.some(p => p.image?.includes('snacks_'));
        const hasBaby = chunk.some(p => p.image?.includes('baby_'));
        const hasSmall = chunk.some(p => p.image?.includes('spreads_') || p.image?.includes('chocolates_'));
        const hasCereals = chunk.some(p => p.image?.includes('cereals_'));
        
        let height = 165;
        if (hasAtta) height = 270;
        else if (hasTallCleaning) height = 240;
        else if (hasBottle) height = 195;
        else if (hasExtraTall) height = 215;
        else if (hasCereals) height = 205; // Taller shelf for the newly enlarged uniform cereal boxes
        else if (hasMedium) height = 185;
        else if (hasShortCleaning) height = 160;
        else if (hasSnacks) height = 145;
        else if (hasBaby) height = 115;
        else if (hasSmall) height = 140;

        // Apply title spacing adjustments for the first row of specific categories
        if (idx === 0) {
            if (cat === "Snacks" || cat === "Spreads" || cat === "Cleaning") {
                height += 20; // Add little spacing after the title
            } else if (cat === "Toiletries") {
                height -= 40; // Reduce the space after toiletries title
            } else if (cat === "Baby Care") {
                height -= 35; // Reduce the space after baby care title
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
            marginBottom: category === "Baby Care" ? 10 : 32, // space out floating categories, less for baby care
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
                        gap: 14,
                        padding: "0 12px",
                    }}>
                        {chunk.map((product, i) => (
                            <div key={`shelf-${product.id}`} style={{ minWidth: 0, flexShrink: 1 }}>
                                <ShelfProduct product={product} index={i} dropShadow="drop-shadow(0px 12px 8px rgba(0,0,0,0.5)) drop-shadow(0px 20px 20px rgba(0,0,0,0.3))" />
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
        <div style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            padding: "10px 24px 80px",
            gap: 20,
            boxSizing: "border-box",
            alignItems: "flex-start"
        }}>
            {/* LEFT COLUMN */}
            <div style={{ width: "38%", flexShrink: 0, display: "flex", flexDirection: "column", gap: 24 }}>
                <VoiceAssistant />
                <div style={{ marginTop: "10px" }}>
                    <FridgeSection />
                </div>
                {leftCategories.map((cat, idx) => 
                    renderCategoryShelf(
                        cat,
                        byCategory(cat as Product["category"]),
                        4, // Narrower shelf fits ~4 items
                        idx === leftCategories.length - 1
                    )
                )}
            </div>

            {/* RIGHT COLUMN */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ zIndex: 100, marginBottom: "12px" }}>
                    {state.items.length > 0 ? (
                        <div>
                            <ShoppingList />
                        </div>
                    ) : (
                        <OffersBanner />
                    )}
                </div>

                {/* Produce at top */}
                <ProduceSection category="Vegetables" title="Fresh Vegetables" />
                <ProduceSection category="Fruits" title="Fresh Fruits" />

                {/* Other food categories */}
                {rightCategories.map((cat, idx) =>
                    renderCategoryShelf(
                        cat,
                        byCategory(cat as Product["category"]),
                        cat === "Packets" ? 4 : (cat === "Cereals" ? 5 : SHELF_ITEMS_PER_ROW),
                        idx === rightCategories.length - 1
                    )
                )}
            </div>
        </div>
    );
}
