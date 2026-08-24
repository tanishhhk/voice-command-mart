import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";

export default function ProductHoverCard({ product }: { product: Product }) {
    return (
        <div
            className="absolute z-50 left-[100%] ml-4 top-1/2 -translate-y-1/2 w-52 pointer-events-none"
            style={{
                animation: "fadeSlideRight 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
        >
            <style>{`
                @keyframes fadeSlideRight {
                    from { opacity: 0; transform: translate(-10px, -50%); }
                    to { opacity: 1; transform: translate(0, -50%); }
                }
            `}</style>

            <div
                className="bg-[#0a0c10] border border-[#2f7cff]/30 rounded-xl p-3.5 flex flex-col gap-2.5 pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(47,124,255,0.15)] relative"
            >
                {/* Header */}
                <div>
                    <h4 className="text-gray-100 font-semibold text-sm leading-tight">
                        {product.name}
                    </h4>
                    <p className="text-gray-400 text-xs mt-0.5">{product.brand}</p>
                </div>

                {/* Price & Quantity */}
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-[#2f7cff] font-bold text-lg">
                            ₹{product.price.toFixed(2)}
                        </span>
                        {product.quantity && (
                            <span className="text-gray-500 text-[11px] ml-1.5 font-medium uppercase tracking-wider">
                                {product.quantity}
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Button */}
                <button className="mt-1 w-full flex items-center justify-center gap-2 bg-[#121824] hover:bg-[#2f7cff] text-gray-300 hover:text-white transition-all duration-300 py-2 rounded-lg text-xs font-semibold border border-white/5 hover:border-[#2f7cff] hover:shadow-[0_0_12px_rgba(47,124,255,0.4)]">
                    <ShoppingCart size={14} />
                    Add to Cart
                </button>
                
                {/* Pointer Arrow */}
                <div 
                    className="absolute top-1/2 -translate-y-1/2 -left-[6px] w-3 h-3 bg-[#0a0c10] border-l border-b border-[#2f7cff]/30 rotate-45"
                />
            </div>
        </div>
    );
}
