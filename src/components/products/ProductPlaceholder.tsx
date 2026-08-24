"use client";

import { useState } from "react";

export type ProductType = "milk" | "yogurt" | "eggs" | "chips" | "cereal" | "jar";

export type ChipVariant = "lays" | "doritos" | "cheetos" | "kettle";
export type CerealVariant = "frosted-flakes" | "froot-loops" | "cheerios";

interface ProductPlaceholderProps {
    type?: ProductType;
    highlighted?: boolean;
    badgeQuantity?: number;
    chipVariant?: ChipVariant;
    cerealVariant?: CerealVariant;
    imageUrl?: string;
}

/* ── Product Image (Fast Instant Render) ─────────────────────── */
function ProductImage({ 
    src, 
    alt, 
    maxH, 
    scale, 
    translateY 
}: { 
    src: string; 
    alt: string; 
    maxH: number; 
    scale: number; 
    translateY: string; 
}) {
    return (
        <div className="relative flex items-end justify-center w-full h-full">
            <img 
                src={src} 
                alt={alt} 
                decoding="async"
                className="object-contain"
                style={{ 
                    maxHeight: `${maxH}px`,
                    transform: `scale(${scale}) ${translateY}`,
                    transformOrigin: "bottom center",
                    filter: "drop-shadow(0px 6px 10px rgba(0,0,0,0.5))"
                }}
            />
        </div>
    );
}

/* ── Badge Component ───────────────────────────────────────── */
function QuantityBadge({ quantity }: { quantity?: number }) {
    if (!quantity) return null;
    return (
        <div className="absolute -top-3 -right-3 z-50 bg-[#2f7cff] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(47,124,255,0.8)] border-2 border-[#0a0c10] animate-in zoom-in duration-300">
            +{quantity}
        </div>
    );
}

/* ── Glow / Hover helper ───────────────────────────────────── */
const getGlowClasses = (highlighted?: boolean) => {
    // Base classes for smooth animation and cursor
    const base = "flex flex-col items-center cursor-pointer transition-all duration-300 ease-out";
    // Hover: scale up + dark shadow
    const hover = "hover:scale-105 hover:drop-shadow-[0_0_16px_rgba(0,0,0,0.8)] hover:-translate-y-1";
    // Highlighted (e.g. from voice selection)
    const highlight = highlighted 
        ? "scale-105 drop-shadow-[0_0_16px_rgba(0,0,0,1)] -translate-y-1" 
        : "";
    
    return `${base} ${hover} ${highlight}`;
};

const shadow = (w: number) => (
    <div
        style={{
            width: w,
            height: 6,
            background: "rgba(0,0,0,0.65)",
            borderRadius: "50%",
            filter: "blur(4px)",
            marginTop: 4,
            transition: "all 300ms ease-out",
        }}
    />
);

/* ── Milk Carton (Scaled 1.8x) ─────────────────────────────── */
function MilkCarton({ highlighted, badgeQuantity }: { highlighted?: boolean; badgeQuantity?: number }) {
    return (
        <div className={getGlowClasses(highlighted) + " relative"}>
            <QuantityBadge quantity={badgeQuantity} />
            <div
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: "34px solid transparent",
                    borderRight: "34px solid transparent",
                    borderBottom: "18px solid #8fb4d8",
                }}
            />
            <div
                style={{
                    width: 68,
                    height: 162,
                    background: "linear-gradient(160deg, #d4e8f8 0%, #9cbcd8 100%)",
                    borderRadius: "0 0 5px 5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: 40,
                        background: "#1a4d8a",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ color: "#fff", fontSize: 12, fontWeight: 900, letterSpacing: 5 }}>
                        MILK
                    </span>
                </div>
                <div style={{ marginTop: 14, fontSize: 16, fontWeight: 700, color: "#1a3a5c" }}>2%</div>
                <div style={{ marginTop: 7, width: 36, height: 2, background: "rgba(26,77,138,0.3)" }} />
                <div style={{ marginTop: 7, fontSize: 11, color: "#4a6a8a" }}>52 FL OZ</div>
            </div>
            {shadow(50)}
        </div>
    );
}

/* ── Yogurt Cup (Scaled 1.8x) ──────────────────────────────── */
function YogurtCup({ highlighted, badgeQuantity }: { highlighted?: boolean; badgeQuantity?: number }) {
    return (
        <div className={getGlowClasses(highlighted) + " relative"}>
            <QuantityBadge quantity={badgeQuantity} />
            <div
                style={{
                    width: 83,
                    height: 7,
                    background: "linear-gradient(180deg, #d8d8d8, #b0b0b0)",
                    borderRadius: "5px 5px 0 0",
                }}
            />
            <div
                style={{
                    width: 79,
                    height: 104,
                    background: "linear-gradient(160deg, #f4f0e6 0%, #ddd4bc 100%)",
                    clipPath: "polygon(7% 0%, 93% 0%, 100% 100%, 0% 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                }}
            >
                <div
                    style={{
                        width: "68%",
                        height: 36,
                        background: "#c0392b",
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ color: "#fff", fontSize: 11, fontWeight: 900, letterSpacing: 1.5 }}>
                        CHOBANI
                    </span>
                </div>
                <span style={{ fontSize: 11, color: "#7a6a5a" }}>Greek</span>
            </div>
            {shadow(58)}
        </div>
    );
}

/* ── Egg Carton (Scaled 1.8x) ──────────────────────────────── */
function EggCarton({ highlighted, badgeQuantity }: { highlighted?: boolean; badgeQuantity?: number }) {
    return (
        <div className={getGlowClasses(highlighted) + " relative"}>
            <QuantityBadge quantity={badgeQuantity} />
            <div
                className="relative overflow-hidden"
                style={{
                    width: 137,
                    height: 61,
                    background: "linear-gradient(160deg, #d0c49a 0%, #b8a87a 100%)",
                    borderRadius: "7px 7px 3px 3px",
                }}
            >
                <div className="absolute top-2 left-0 right-0 flex justify-around px-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            style={{
                                width: 14,
                                height: 20,
                                background: "rgba(0,0,0,0.18)",
                                borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
                            }}
                        />
                    ))}
                </div>
                <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center">
                    <span style={{ fontSize: 11, color: "#5a4830", fontWeight: 700, letterSpacing: 3 }}>
                        EGGS · 12ct
                    </span>
                </div>
            </div>
            {shadow(104)}
        </div>
    );
}

/* ── Chip Bag (Scaled 1.8x) ────────────────────────────────── */
const chipConfig: Record<ChipVariant, { bg: string; label: string; brand: string }> = {
    lays:    { bg: "linear-gradient(160deg, #e8b800 0%, #c89400 100%)", label: "CLASSIC",  brand: "LAY'S"   },
    doritos: { bg: "linear-gradient(160deg, #d44400 0%, #a83000 100%)", label: "NACHO",    brand: "DORITOS" },
    cheetos: { bg: "linear-gradient(160deg, #e06000 0%, #b84800 100%)", label: "CRUNCHY",  brand: "CHEETOS" },
    kettle:  { bg: "linear-gradient(160deg, #3a5c30 0%, #263d20 100%)", label: "SEA SALT", brand: "KETTLE"  },
};

function ChipBag({ highlighted, badgeQuantity, variant = "lays" }: { highlighted?: boolean; badgeQuantity?: number; variant?: ChipVariant }) {
    const cfg = chipConfig[variant];
    return (
        <div className={getGlowClasses(highlighted) + " relative"}>
            <QuantityBadge quantity={badgeQuantity} />
            <div
                style={{
                    width: 79,
                    height: 158,
                    background: cfg.bg,
                    clipPath: "polygon(18% 0%, 82% 0%, 96% 18%, 100% 100%, 0% 100%, 4% 18%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 7,
                    paddingTop: 32,
                }}
            >
                <div
                    style={{
                        width: "62%",
                        padding: "7px 0",
                        background: "rgba(255,255,255,0.18)",
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ color: "#fff", fontSize: 12, fontWeight: 900, letterSpacing: 1 }}>
                        {cfg.brand}
                    </span>
                </div>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", letterSpacing: 1.5 }}>
                    {cfg.label}
                </span>
            </div>
            {shadow(50)}
        </div>
    );
}

/* ── Cereal Box (Scaled 1.8x) ──────────────────────────────── */
const cerealConfig: Record<CerealVariant, { bg: string; accent: string; name: string[]; brand: string }> = {
    "frosted-flakes": { bg: "linear-gradient(160deg, #1a5fa8 0%, #0e3d6e 100%)", accent: "#f4d000", name: ["FROSTED", "FLAKES"], brand: "KELLOGG'S" },
    "froot-loops":    { bg: "linear-gradient(160deg, #e0400a 0%, #a82c06 100%)", accent: "#ffd700", name: ["FROOT",   "LOOPS" ], brand: "KELLOGG'S" },
    "cheerios":       { bg: "linear-gradient(160deg, #e8b800 0%, #c89400 100%)", accent: "#e84000", name: ["CHEERIOS", ""      ], brand: "GEN. MILLS" },
};

function CerealBox({ highlighted, badgeQuantity, variant = "frosted-flakes" }: { highlighted?: boolean; badgeQuantity?: number; variant?: CerealVariant }) {
    const cfg = cerealConfig[variant];
    return (
        <div className={getGlowClasses(highlighted) + " relative"}>
            <QuantityBadge quantity={badgeQuantity} />
            <div
                className="relative overflow-hidden"
                style={{
                    width: 93,
                    height: 154,
                    background: cfg.bg,
                    borderRadius: "5px 5px 3px 3px",
                }}
            >
                {/* Side depth */}
                <div
                    className="absolute right-0 top-0 bottom-0"
                    style={{ width: 16, background: "rgba(0,0,0,0.3)" }}
                />
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                    style={{ paddingRight: 16 }}
                >
                    {cfg.name.map((line, i) =>
                        line ? (
                            <span key={i} style={{ fontSize: 14, fontWeight: 900, color: cfg.accent, letterSpacing: 1, lineHeight: 1.1, textAlign: "center" }}>
                                {line}
                            </span>
                        ) : null
                    )}
                    <div style={{ width: 50, height: 2, background: `${cfg.accent}44`, marginTop: 3 }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{cfg.brand}</span>
                </div>
            </div>
            {shadow(72)}
        </div>
    );
}

/* ── Jar (Nutella / PB / Sauce) (Scaled 1.8x) ──────────────── */
function Jar({ highlighted, badgeQuantity }: { highlighted?: boolean; badgeQuantity?: number }) {
    return (
        <div className={getGlowClasses(highlighted) + " relative"}>
            <QuantityBadge quantity={badgeQuantity} />
            <div
                style={{
                    width: 65,
                    height: 14,
                    background: "linear-gradient(180deg, #c0c0c0, #909090)",
                    borderRadius: "5px 5px 0 0",
                }}
            />
            <div
                className="relative overflow-hidden"
                style={{
                    width: 72,
                    height: 108,
                    background: "linear-gradient(160deg, #3a2010 0%, #20100a 100%)",
                    borderRadius: "3px 3px 10px 10px",
                    border: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                {/* Glass sheen */}
                <div
                    className="absolute left-2 top-2 bottom-2"
                    style={{
                        width: 10,
                        background: "linear-gradient(180deg, rgba(255,255,255,0.12), transparent)",
                        borderRadius: 5,
                    }}
                />
                {/* Label */}
                <div
                    className="absolute"
                    style={{
                        top: 14, bottom: 14, left: 7, right: 7,
                        background: "#c8360a",
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 3,
                    }}
                >
                    <span style={{ fontSize: 14, fontWeight: 900, color: "#fff", letterSpacing: 1 }}>Nutella</span>
                    <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.3)" }} />
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>13 OZ</span>
                </div>
            </div>
            {shadow(58)}
        </div>
    );
}

export default function ProductPlaceholder({ type, highlighted, badgeQuantity, chipVariant, cerealVariant, imageUrl }: ProductPlaceholderProps) {
    if (imageUrl) {
        // We know IDs 48-52 and 61 are bottles, and all Drinks (assuming drinks have "drinks" in URL or are in a specific ID range)
        // Let's use a regex on the URL to detect drinks and specific dairy bottles
        const isDrink = imageUrl.includes('/drinks/');
        const isDairyBottle = imageUrl.includes('dairy_4.png') || imageUrl.includes('dairy_5.png') || 
                              imageUrl.includes('dairy_6.png') || imageUrl.includes('dairy_7.png') || 
                              imageUrl.includes('dairy_8.png') || imageUrl.includes('dairy_19.png');
        const isRow2Scale = imageUrl.includes('dairy_18.png') || imageUrl.includes('dairy_17.png') || imageUrl.includes('dairy_9.png') || imageUrl.includes('dairy_10.png');
        const isCup = imageUrl.includes('dairy_11.png') || imageUrl.includes('dairy_12.png') || imageUrl.includes('dairy_13.png') || imageUrl.includes('dairy_16.png');
        const isButter = imageUrl.includes('dairy_15.png');
        const isCerealBox = imageUrl.includes('cereals_');
        const isPatanjaliOats = imageUrl.includes('cereals_8.png');
        const isChocolate = imageUrl.includes('chocolates_');
        const isGrocery = imageUrl.includes('snacks_') || imageUrl.includes('baby_') || imageUrl.includes('noodles_') || imageUrl.includes('cupnoodles_');
        const isCleaning = imageUrl.includes('cleaning_');
        const isSoap = imageUrl.includes('toiletries_4') || imageUrl.includes('toiletries_11') || imageUrl.includes('toiletries_12');
        const isMiscRow2 = imageUrl.includes('random_6.png') || imageUrl.includes('random_8.png') || imageUrl.includes('random_4.png') || imageUrl.includes('random_10.png') || imageUrl.includes('random_7.png');
        const isAtta = imageUrl.includes('random_7.png');
        const isToiletriesOrMisc = (imageUrl.includes('toiletries_') || imageUrl.includes('random_')) && !isSoap && !isMiscRow2;
        const isSpread = imageUrl.includes('spreads_');
        const isVegetable = imageUrl.includes('vegetables_');
        const isPacket = imageUrl.includes('packets_');
        
        let maxH = 120;
        let scale = 1;
        
        // Tall bottles (Fridge Row 1)
        if (isDrink || isDairyBottle) { maxH = 150; scale = 1.15; } 
        
        // Cartons (Fridge Row 2)
        if (isRow2Scale) { maxH = 130; scale = 1.15; } 
        
        // Butter/Cheese (Fridge Bottom)
        if (isButter) { maxH = 80; scale = 1.0; } 
        
        // Yogurt Cups (Fridge Row 3)
        if (isCup) { maxH = 90; scale = 1.15; } 
        
        // Cereals (Uniform large size for all)
        if (isCerealBox) { maxH = 155; scale = 1.25; }
        
        // Chocolates / Grocery
        if (isChocolate) { maxH = 110; scale = 1.2; }
        if (isGrocery) { maxH = 110; scale = 1.15; }
        
        const isSnacks = imageUrl.includes('snacks_');
        const isBiscuit = imageUrl.includes('snacks_15') || imageUrl.includes('snacks_16') || imageUrl.includes('snacks_20') || imageUrl.includes('snacks_21');
        const isNoodles = imageUrl.includes('noodles_') || imageUrl.includes('cupnoodles_');
        
        if (isBiscuit) { maxH = 112; scale = 1.2; }
        else if (isSnacks) { maxH = 125; scale = 1.35; }
        
        if (isNoodles) { maxH = 125; scale = 1.35; }

        const isVimOrScotch = imageUrl.includes('cleaning_3.png') || imageUrl.includes('cleaning_4.png');
        if (isVimOrScotch) { maxH = 100; scale = 1.15; }
        else if (isCleaning) { maxH = 145; scale = 1.45; }
        if (isToiletriesOrMisc) { maxH = 130; scale = 1.35; }
        if (isMiscRow2) { maxH = 145; scale = 1.35; }
        if (isAtta) { maxH = 175; scale = 1.5; }
        if (isSoap) { maxH = 115; scale = 1.25; }
        if (isSpread) { maxH = 130; scale = 1.35; }
        
        // Vegetables
        if (isVegetable) { maxH = 90; scale = 1.35; } 
        
        // Packets (Amul milk/dahi) - scale up and settle down
        if (isPacket) { maxH = 95; scale = 1.15; }

        const isDrinkOrDairyBottle = isDrink || isDairyBottle || imageUrl.includes('drinks_');
        
        // Determine translateY for settling on the shelf
        let translateY = '';
        if (isDrinkOrDairyBottle) translateY = 'translateY(12px)';
        if (isPacket) translateY = 'translateY(4px)'; // Push down slightly to settle on shelf
        
        return (
            <div className={getGlowClasses(highlighted) + " relative flex flex-col items-center justify-end h-full"}>
                <QuantityBadge quantity={badgeQuantity} />
                <ProductImage
                    src={imageUrl}
                    alt="product"
                    maxH={maxH}
                    scale={scale}
                    translateY={translateY}
                />
            </div>
        );
    }

    switch (type) {
        case "milk":   return <MilkCarton highlighted={highlighted} badgeQuantity={badgeQuantity} />;
        case "yogurt": return <YogurtCup highlighted={highlighted} badgeQuantity={badgeQuantity} />;
        case "eggs":   return <EggCarton highlighted={highlighted} badgeQuantity={badgeQuantity} />;
        case "chips":  return <ChipBag highlighted={highlighted} badgeQuantity={badgeQuantity} variant={chipVariant} />;
        case "cereal": return <CerealBox highlighted={highlighted} badgeQuantity={badgeQuantity} variant={cerealVariant} />;
        case "jar":    return <Jar highlighted={highlighted} badgeQuantity={badgeQuantity} />;
        default:       return null;
    }
}
