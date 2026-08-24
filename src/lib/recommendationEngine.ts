import { products } from "@/data/products";
import { Product } from "@/types/product";

export interface MockPurchaseRecord {
    productId: number;
    lastPurchasedDaysAgo: number;
    typicalCycleDays: number;
    usualQuantity: string;
}

// 30-Day simulated household purchase history & consumption cycles
export const MOCK_PURCHASE_HISTORY: MockPurchaseRecord[] = [
    { productId: 52, lastPurchasedDaysAgo: 5, typicalCycleDays: 4, usualQuantity: "1 L" },       // Amul Taaza Milk (Dairy)
    { productId: 104, lastPurchasedDaysAgo: 6, typicalCycleDays: 5, usualQuantity: "1 bunch" }, // Radish/Beetroot (Produce)
    { productId: 8, lastPurchasedDaysAgo: 11, typicalCycleDays: 9, usualQuantity: "350 g" },     // Cheerios (Cereal)
    { productId: 24, lastPurchasedDaysAgo: 16, typicalCycleDays: 14, usualQuantity: "200 g" },   // Vim Dishwash Bar (Cleaning)
    { productId: 121, lastPurchasedDaysAgo: 7, typicalCycleDays: 6, usualQuantity: "1 kg" },     // Fresh Apples (Fruit)
];

// Product IDs that are predicted as running low based on the past cycle
export const RUNNING_LOW_PRODUCT_IDS = new Set(
    MOCK_PURCHASE_HISTORY
        .filter(record => record.lastPurchasedDaysAgo >= record.typicalCycleDays)
        .map(record => record.productId)
);

export function isProductRunningLow(productId: number): boolean {
    return RUNNING_LOW_PRODUCT_IDS.has(productId);
}

export function getRunningLowProducts(): { product: Product; daysAgo: number }[] {
    const results: { product: Product; daysAgo: number }[] = [];
    for (const record of MOCK_PURCHASE_HISTORY) {
        if (record.lastPurchasedDaysAgo >= record.typicalCycleDays) {
            const prod = products.find(p => p.id === record.productId);
            if (prod) {
                results.push({ product: prod, daysAgo: record.lastPurchasedDaysAgo });
            }
        }
    }
    return results;
}
