export type ProductCategory =
    | "Baby Care"
    | "Cereals"
    | "Chocolates"
    | "Cleaning"
    | "Cup Noodles"
    | "Dairy"
    | "Drinks"
    | "Noodles"
    | "Miscellaneous"
    | "Snacks"
    | "Spreads"
    | "Toiletries"
    | "Packets"
    | "Fruits"
    | "Vegetables"
    | "Beverages"
    | "Pantry"
    | "Breakfast"
    | "Household"
    | "Meat"
    | "Produce"
    | "Bakery"
    | "Other";

export interface Product {
    id: number;
    name: string;
    brand: string;
    category: ProductCategory;
    price: number;
    image: string;
    quantity?: string;
}