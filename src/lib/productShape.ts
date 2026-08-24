import { Product } from "@/types/product";
import { ProductType, ChipVariant, CerealVariant } from "@/components/products/ProductPlaceholder";

export interface ShapeProps {
    type: ProductType;
    chipVariant?: ChipVariant;
    cerealVariant?: CerealVariant;
}

export function getProductShape(product: Product): ShapeProps {
    const name  = product.name.toLowerCase();
    const brand = product.brand.toLowerCase();

    switch (product.category) {
        case "Dairy": {
            if (name.includes("egg"))                             return { type: "eggs"   };
            if (name.includes("yogurt") || brand === "chobani")  return { type: "yogurt" };
            if (name.includes("milk"))                            return { type: "milk"   };
            return { type: "jar" }; 
        }

        case "Beverages": {
            if (name.includes("juice")) return { type: "milk" }; // Carton shape
            return { type: "jar" }; // For sodas, generic cylindrical
        }

        case "Snacks": {
            const variantMap: Record<string, ChipVariant> = {
                "lay's":      "lays",
                "doritos":    "doritos",
                "cheetos":    "cheetos",
                "kettle":     "kettle",
                "pringles":   "lays",     // Fallbacks
                "pop secret": "cheetos",
                "tostitos":   "doritos",
            };
            const chipVariant: ChipVariant = variantMap[brand] ?? "lays";
            return { type: "chips", chipVariant };
        }

        case "Pantry": {
            if (name.includes("flour") || name.includes("sugar") || name.includes("rice")) {
                return { type: "cereal", cerealVariant: "frosted-flakes" }; // Bags/boxes
            }
            if (name.includes("pasta")) {
                return { type: "cereal", cerealVariant: "cheerios" }; // Long box
            }
            return { type: "jar" }; // Nutella, Peanut butter, sauce
        }

        case "Breakfast": {
            if (name.includes("frosted") || brand.includes("nature")) return { type: "cereal", cerealVariant: "frosted-flakes" };
            if (name.includes("froot") || name.includes("loop"))      return { type: "cereal", cerealVariant: "froot-loops"    };
            if (name.includes("cheerio") || brand.includes("quaker") || brand.includes("familia")) return { type: "cereal", cerealVariant: "cheerios" };
            return { type: "cereal", cerealVariant: "frosted-flakes" };
        }

        default:
            return { type: "jar" };
    }
}
