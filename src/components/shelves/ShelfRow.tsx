import { ReactNode } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

interface ShelfRowProps {
    label: string;
    icon?: string;
    children: ReactNode;
    height?: number;
    hasLight?: boolean;
}

export default function ShelfRow({ label, icon, children, height = 160, hasLight = false }: ShelfRowProps) {
    return (
        <div className="w-full" style={{ marginBottom: 24 }}>
            {/* Section label row */}
            {label && (
                <div className="flex items-center justify-center px-3 py-2">
                    <div className="flex items-center gap-3">
                        {/* Decorative line left */}
                        <div style={{ width: 40, height: 2, background: "linear-gradient(90deg, transparent, #8a735c)", borderRadius: 2 }} />
                        <p className={montserrat.className} style={{
                            color: "var(--section-title-color)",
                            fontSize: 16,
                            letterSpacing: "0.15em",
                            fontWeight: 800,
                            margin: 0,
                            textTransform: "uppercase",
                            textShadow: "var(--text-shadow, 0px 1px 2px rgba(255,255,255,0.5))"
                        }}>
                            {label}
                        </p>
                        {/* Decorative line right */}
                        <div style={{ width: 40, height: 2, background: "linear-gradient(270deg, transparent, #8a735c)", borderRadius: 2 }} />
                    </div>
                </div>
            )}

            {/* Shelf unit — dynamic width wrapper */}
            <div className="relative w-full flex justify-center" style={{ overflow: "visible" }}>
                <div style={{ display: "inline-flex", flexDirection: "column", position: "relative" }}>
                    {/* Products layer — statically positioned so it dictates the width */}
                    <div
                        style={{
                            height, // height of the shelf space
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            paddingLeft: 40, // Extend shelf past products slightly
                            paddingRight: 40,
                            // push down so product bottoms sit exactly on shelf surface
                            marginBottom: -14,
                            position: "relative",
                        }}
                    >
                        {children}
                    </div>

                {/* Shelf plank — Dynamic theming with proper 3D slab shape */}
                <div style={{ position: "relative", zIndex: 20 }}>
                    {/* Top surface */}
                    <div style={{
                        height: 8,
                        background: "linear-gradient(180deg, var(--shelf-top-start) 0%, var(--shelf-top-end) 100%)",
                        borderTop: "1px solid var(--shelf-border-top)",
                        boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.4)",
                        borderRadius: "2px 2px 0 0",
                    }} />
                    {/* Front face / fascia */}
                    <div style={{
                        height: 16,
                        background: "linear-gradient(180deg, var(--shelf-front-start) 0%, var(--shelf-front-end) 100%)",
                        borderTop: "1px solid var(--shelf-fascia-border-top)",
                        borderBottom: "3px solid var(--shelf-border-bottom)",
                        // Realistic heavy 3D shadow cast downward and outward
                        boxShadow: "0 35px 50px -10px rgba(0,0,0,0.8), 0 15px 25px -5px rgba(0,0,0,0.6), 0 8px 10px rgba(0,0,0,0.4)", 
                        borderRadius: "0 0 4px 4px",
                        position: "relative",
                    }}>
                        {/* Under-shelf Lights */}
                        {hasLight && (
                            <div style={{
                                position: "absolute",
                                top: "100%",
                                left: "10%",
                                right: "10%",
                                height: 120, // Light throw distance
                                background: "radial-gradient(ellipse at top, rgba(255, 230, 150, 0.25) 0%, rgba(255, 230, 150, 0.05) 50%, transparent 80%)",
                                pointerEvents: "none",
                                zIndex: -1, // Behind the products below
                            }} />
                        )}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
