function FridgeSection() {
    const dairyChunks = chunkArray(byCategory("Dairy"), FRIDGE_ITEMS_PER_ROW);
    const drinkChunks = chunkArray(byCategory("Drinks"), FRIDGE_ITEMS_PER_ROW);
    const itemChunks = [...dairyChunks, ...drinkChunks];

    return (
        <div className="w-full" style={{ marginBottom: 24 }}>
            {/* Fridge outer frame ΓÇö light metallic silver border */}
            <div style={{
                borderRadius: 28,
                background: "linear-gradient(145deg, #eaf0f5 0%, #c4d0dc 15%, #aebecd 50%, #90a1b3 100%)", 
                boxShadow: "0 40px 80px -15px rgba(0,10,20,0.6), 0 20px 40px -10px rgba(0,10,20,0.4), inset 0 2px 12px rgba(255,255,255,1), inset 0 -4px 15px rgba(0,30,60,0.15)",
                padding: "12px",
            }}>
                <div
                    style={{
                        borderRadius: 16,
                        background: "#e4f0f8",
                        border: "2px solid #aebecd",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                {/* Top header bar ΓÇö matches reference light bar with REFRIGERATED label */}
                <div style={{
                    height: 38,
                    background: "linear-gradient(180deg, #f4f7fa 0%, #eef3f7 100%)",
                    borderBottom: "1px solid #dce8f0",
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
                            color: "#355375",
                        }}>REFRIGERATED</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{
                            width: 7, height: 7, borderRadius: "50%",
                            background: "#22cc44",
                            boxShadow: "0 0 6px #22cc44",
                        }} />
                        <span style={{ fontSize: 10, color: "#597c9c", fontWeight: 500 }}>2ΓÇô6┬░C</span>
                    </div>
                </div>

                {/* Fridge interior base */}
                <div style={{
                    background: "linear-gradient(180deg, #e4f0f8 0%, #d2e4f0 100%)",
                    position: "relative",
                    boxShadow: "inset 0 20px 50px rgba(0,40,80,0.05)",
                }}>
                    
                    {/* Vertical panels on back wall */}
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                        background: "repeating-linear-gradient(90deg, transparent 0%, transparent 12.3%, rgba(255,255,255,0.4) 12.3%, rgba(255,255,255,0.4) 12.5%)",
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
                                    zIndex: 10,
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
                                            {/* Soft Radial Glow on Back Wall */}
                                            <div style={{
                                                position: "absolute",
                                                top: 0,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: "120%",
                                                height: "100%",
                                                background: "radial-gradient(ellipse at top, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)",
                                                pointerEvents: "none",
                                                zIndex: 0,
                                            }} />
                                            {/* Recessed Bulb Highlight */}
                                            <div style={{
                                                position: "absolute",
                                                top: -3,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: 20,
                                                height: 6,
                                                background: "#ffffff",
                                                borderRadius: "50%",
                                                boxShadow: "0 0 12px 4px rgba(255, 255, 255, 0.9)",
                                                pointerEvents: "none",
                                                zIndex: 0,
                                            }} />
                                            <div style={{ filter: "drop-shadow(0px 8px 12px rgba(0,30,60,0.15))" }}>
                                                <ShelfProduct product={product} index={i} />
                                            </div>
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
                                            background: "linear-gradient(180deg, rgba(0,50,100,0.08) 0%, transparent 100%)",
                                            zIndex: -1,
                                            pointerEvents: "none",
                                        }} />
                                        
                                        {/* Glass block shelf */}
                                        <div style={{
                                            height: 12,
                                            background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(200,230,255,0.4) 100%)",
                                            borderTop: "1px solid #ffffff",
                                            borderBottom: "2px solid #8cc5e3",
                                            backdropFilter: "blur(4px)",
                                            boxShadow: "0 10px 20px rgba(0,40,80,0.05)",
                                        }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Bottom tray for last row ΓÇö matches solid shelves */}
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

/* ΓöÇΓöÇ Vegetable Section (wooden crate cubbies) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function VegetableSection() {
    const vegProducts = byCategory("Vegetables");
    if (vegProducts.length === 0) return null;

    // 4 rows ├ù 7 columns = 28 slots
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
                    <span className={`${montserrat.className} text-[#2a3b4c] dark:text-[#f4ebd0]`} style={{
                        fontSize: 15,
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                    }}>Fresh Vegetables</span>
                </div>
            </div>

            {/* Outer container ΓÇö dark framed panel matching reference */}
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
                                            overflow: "hidden",
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
                                                    transform: "scale(0.9)", 
                                                    zIndex: 5, 
                                                    position: "relative",
                                                    filter: "drop-shadow(0px 8px 12px rgba(0,0,0,0.8))"
                                                }}>
                                                    <ShelfProduct product={p} index={colIdx} />
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

/* ΓöÇΓöÇ Category Renderer (right shelf) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function renderCategoryShelf(category: string, prods: Product[], itemsPerRow: number) {
    if (prods.length === 0) return null;
    let chunks = chunkArray(prods, itemsPerRow);
    
    // Custom logic to support exact rows for Toiletries
    if (category === "Toiletries") {
        chunks = [
            prods.slice(0, 3), // Lux shelf (3 items)
            prods.slice(3, 8), // Axe shelf + Gillette (5 items)
            prods.slice(8, 13), // Hair & Skin (5 items)
            prods.slice(13, 17), // Face wash (4 items)
            prods.slice(17, 21) // Dental (4 items)
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
                height -= 20; // Reduce the space after toiletries title
            }
        }
        return height;
    };

    const iconMap: Record<string, string> = {
        "Baby Care": "≡ƒº┤",
        "Cereals": "≡ƒÑú",
        "Chocolates": "≡ƒì½",
        "Snacks": "≡ƒì┐",
        "Spreads": "≡ƒ½Ö",
        "Noodles": "≡ƒì£",
        "Cup Noodles": "≡ƒì£",
        "Toiletries": "≡ƒ¬Ñ",
        "Cleaning": "≡ƒº╣",
        "Miscellaneous": "≡ƒ¢Æ",
    };

    return (
        <div key={category} style={{
            marginBottom: 32, // space out floating categories
        }}>
            {chunks.map((chunk, idx) => (
                <ShelfRow
                    key={`${category}-${idx}`}
                    label={idx === 0 ? category.toUpperCase() : ""}
                    icon={idx === 0 ? iconMap[category] : undefined}
                    height={getRowHeight(chunk, category, idx)}
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
                                <ShelfProduct product={product} index={i} />
                            </div>
                        ))}
                    </div>
                </ShelfRow>
            ))}
        </div>
    );
}

/* ΓöÇΓöÇ Main Component ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
