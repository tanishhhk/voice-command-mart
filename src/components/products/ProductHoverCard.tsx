import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";

interface ProductHoverCardProps {
    product: Product;
    align?: "left" | "right" | "top";
    isTopRow?: boolean;
    isBottomRow?: boolean;
}

export default function ProductHoverCard({ 
    product, 
    align = "right", 
    isTopRow = false, 
    isBottomRow = false 
}: ProductHoverCardProps) {
    const isLeft = align === "left";

    // Vertical positioning for desktop
    let desktopVertical = "sm:top-1/2 sm:-translate-y-1/2";
    let arrowVertical = "sm:top-1/2 sm:-translate-y-1/2";

    if (isTopRow) {
        desktopVertical = "sm:top-0 sm:translate-y-0";
        arrowVertical = "sm:top-6 sm:translate-y-0";
    } else if (isBottomRow) {
        desktopVertical = "sm:bottom-0 sm:top-auto sm:translate-y-0";
        arrowVertical = "sm:bottom-6 sm:top-auto sm:translate-y-0";
    }

    // Mobile positioning: top row opens below product, otherwise opens above
    const mobileVertical = isTopRow 
        ? "top-[105%] bottom-auto" 
        : "bottom-[105%] top-auto";

    return (
        <div
            className={`
                absolute z-[200] pointer-events-none w-48 sm:w-56
                /* Mobile positioning: */
                ${mobileVertical} left-1/2 -translate-x-1/2
                /* Desktop horizontal: */
                ${isLeft 
                    ? "sm:right-[100%] sm:left-auto sm:translate-x-0 sm:mr-3.5" 
                    : "sm:left-[100%] sm:right-auto sm:translate-x-0 sm:ml-3.5"
                }
                /* Desktop vertical: */
                ${desktopVertical}
            `}
            style={{
                animation: "fadeSlideHover 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
        >
            <style>{`
                @keyframes fadeSlideHover {
                    from { opacity: 0; transform: scale(0.92); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>

            <div
                className="bg-[#080b11]/95 backdrop-blur-md border border-[#2f7cff]/40 rounded-xl p-3 sm:p-3.5 flex flex-col gap-2 pointer-events-auto shadow-[0_16px_40px_rgba(0,0,0,0.95),0_0_24px_rgba(47,124,255,0.25)] relative"
            >
                {/* Header */}
                <div>
                    <h4 className="text-gray-100 font-semibold text-xs sm:text-sm leading-tight line-clamp-2">
                        {product.name}
                    </h4>
                    <p className="text-gray-400 text-[11px] sm:text-xs mt-0.5">{product.brand}</p>
                </div>

                {/* Price & Quantity */}
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-[#3b82f6] font-bold text-base sm:text-lg">
                            ₹{product.price.toFixed(2)}
                        </span>
                        {product.quantity && (
                            <span className="text-gray-400 text-[10px] sm:text-[11px] ml-1.5 font-medium uppercase tracking-wider">
                                {product.quantity}
                            </span>
                        )}
                    </div>
                </div>


                {/* Desktop Pointer Arrow: Right arrow if align=left, Left arrow if align=right */}
                {isLeft ? (
                    <div 
                        className={`hidden sm:block absolute ${arrowVertical} -right-[6px] w-3 h-3 bg-[#080b11] border-r border-t border-[#2f7cff]/40 rotate-45`}
                    />
                ) : (
                    <div 
                        className={`hidden sm:block absolute ${arrowVertical} -left-[6px] w-3 h-3 bg-[#080b11] border-l border-b border-[#2f7cff]/40 rotate-45`}
                    />
                )}

                {/* Mobile Pointer Arrow */}
                {isTopRow ? (
                    <div 
                        className="block sm:hidden absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#080b11] border-l border-t border-[#2f7cff]/40 rotate-45"
                    />
                ) : (
                    <div 
                        className="block sm:hidden absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#080b11] border-r border-b border-[#2f7cff]/40 rotate-45"
                    />
                )}
            </div>
        </div>
    );
}
