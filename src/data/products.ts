import { Product } from "../types/product";

export const products: Product[] = [
    // BABY CARE
    { id: 1, name: "Johnson's Baby Wipes", brand: "Johnson", category: "Baby Care", price: 150, quantity: "72 pcs", image: "/products/baby/baby_1.png" },
    { id: 2, name: "Pampers Baby Wipes", brand: "Pampers", category: "Baby Care", price: 150, quantity: "72 pcs", image: "/products/baby/baby_2.png" },
    { id: 3, name: "Huggies Baby Wipes", brand: "Huggies", category: "Baby Care", price: 150, quantity: "72 pcs", image: "/products/baby/baby_3.png" },
    { id: 4, name: "Johnson's Baby Powder", brand: "Johnson", category: "Baby Care", price: 120, quantity: "200 g", image: "/products/baby/baby_4.png" },

    // CEREALS
    { id: 5, name: "Kellogg's Frosted Flakes", brand: "Kellogg", category: "Cereals", price: 250, quantity: "350 g", image: "/products/cereals/cereals_1.png" },
    { id: 6, name: "Weetabix", brand: "Weetabix", category: "Cereals", price: 250, quantity: "350 g", image: "/products/cereals/cereals_2.png" },
    { id: 7, name: "Kellogg's Corn Flakes", brand: "Kellogg", category: "Cereals", price: 250, quantity: "350 g", image: "/products/cereals/cereals_3.png" },
    { id: 8, name: "Cheerios", brand: "Cheerios", category: "Cereals", price: 250, quantity: "350 g", image: "/products/cereals/cereals_4.png" },
    { id: 9, name: "Cheerios Multi Grain", brand: "Cheerios", category: "Cereals", price: 250, quantity: "350 g", image: "/products/cereals/cereals_5.png" },
    { id: 10, name: "Kellogg's Chocos", brand: "Kellogg", category: "Cereals", price: 250, quantity: "350 g", image: "/products/cereals/cereals_6.png" },
    { id: 11, name: "Nestle Koko Krunch", brand: "Nestle", category: "Cereals", price: 250, quantity: "350 g", image: "/products/cereals/cereals_7.png" },
    { id: 12, name: "Patanjali Oats", brand: "Patanjali", category: "Cereals", price: 160, quantity: "500 g", image: "/products/cereals/cereals_8.png" },
    { id: 137, name: "Bagrry's Crunchy Muesli Fruit & Nut", brand: "Bagrry", category: "Cereals", price: 320, quantity: "400 g", image: "/products/cereals/cereals_9.png" },
    { id: 138, name: "Quaker Oats", brand: "Quaker", category: "Cereals", price: 160, quantity: "500 g", image: "/products/cereals/cereals_10.png" },

    // CHOCOLATES
    { id: 13, name: "Nestle KitKat", brand: "Nestle", category: "Chocolates", price: 40, quantity: "50 g", image: "/products/chocolates/chocolates_1.png" },
    { id: 14, name: "Lindt Lindor Truffles", brand: "Lindt", category: "Chocolates", price: 450, quantity: "200 g", image: "/products/chocolates/chocolates_2.png" },
    { id: 15, name: "Cadbury Dairy Milk", brand: "Cadbury", category: "Chocolates", price: 40, quantity: "50 g", image: "/products/chocolates/chocolates_3.png" },
    { id: 16, name: "ITC Dark Fantasy Choco Melt", brand: "ITC", category: "Chocolates", price: 100, quantity: "100 g", image: "/products/chocolates/chocolates_4.png" },
    { id: 17, name: "Ferrero Rocher", brand: "Ferrero", category: "Chocolates", price: 450, quantity: "200 g", image: "/products/chocolates/chocolates_5.png" },
    { id: 18, name: "M&M's Peanut Jar", brand: "M&M", category: "Chocolates", price: 100, quantity: "100 g", image: "/products/chocolates/chocolates_6.png" },
    { id: 19, name: "Lotte Choco Pie", brand: "Lotte", category: "Chocolates", price: 100, quantity: "100 g", image: "/products/chocolates/chocolates_7.png" },

    // CLEANING
    { id: 25, name: "Surf Excel Easy Wash", brand: "Surf", category: "Cleaning", price: 130, quantity: "1 kg", image: "/products/cleaning/cleaning_5.png" },
    { id: 26, name: "Pril Lime Dishwash Liquid", brand: "Pril", category: "Cleaning", price: 150, quantity: "1 pack", image: "/products/cleaning/cleaning_6.png" },
    { id: 23, name: "Scotch-Brite Garbage Bags", brand: "Scotch-Brite", category: "Cleaning", price: 150, quantity: "1 pack", image: "/products/cleaning/cleaning_3.png" },
    { id: 24, name: "Vim Dishwash Bar", brand: "Vim", category: "Cleaning", price: 15, quantity: "200 g", image: "/products/cleaning/cleaning_4.png" },
    { id: 21, name: "Lizol Floor Cleaner", brand: "Lizol", category: "Cleaning", price: 99, quantity: "500 ml", image: "/products/cleaning/cleaning_1.png" },
    { id: 22, name: "Airwick Room Freshener", brand: "Airwick", category: "Cleaning", price: 150, quantity: "1 pack", image: "/products/cleaning/cleaning_2.png" },
    { id: 27, name: "Harpic Power Plus Original", brand: "Harpic", category: "Cleaning", price: 99, quantity: "500 ml", image: "/products/cleaning/cleaning_7.png" },
    { id: 28, name: "Harpic Power Plus 10X", brand: "Harpic", category: "Cleaning", price: 99, quantity: "500 ml", image: "/products/cleaning/cleaning_8.png" },
    { id: 29, name: "Tide Antibacterial Spray", brand: "Tide", category: "Cleaning", price: 130, quantity: "1 kg", image: "/products/cleaning/cleaning_9.png" },
    { id: 30, name: "Dettol Original Handwash", brand: "Dettol", category: "Cleaning", price: 89, quantity: "200 ml", image: "/products/cleaning/cleaning_10.png" },
    { id: 31, name: "Himalaya Pure Hands", brand: "Himalaya", category: "Cleaning", price: 89, quantity: "200 ml", image: "/products/cleaning/cleaning_11.png" },
    { id: 32, name: "Lifebuoy Handwash", brand: "Lifebuoy", category: "Cleaning", price: 89, quantity: "200 ml", image: "/products/cleaning/cleaning_12.png" },

    // CUP NOODLES (Removed duplicates, leaving 6 unique items)
    { id: 33, name: "Nissin Soba Chili", brand: "Nissin", category: "Cup Noodles", price: 50, quantity: "70 g", image: "/products/cupnoodles/cupnoodles_1.png" },
    { id: 34, name: "Nissin Cup Noodles Chicken", brand: "Nissin", category: "Cup Noodles", price: 50, quantity: "70 g", image: "/products/cupnoodles/cupnoodles_2.png" },
    { id: 35, name: "Maggi 2-Minute Noodles Masala Cup", brand: "Maggi", category: "Cup Noodles", price: 50, quantity: "70 g", image: "/products/cupnoodles/cupnoodles_3.png" },
    { id: 36, name: "Samyang Buldak Hot Chicken Cup", brand: "Samyang", category: "Cup Noodles", price: 50, quantity: "70 g", image: "/products/cupnoodles/cupnoodles_4.png" },
    { id: 37, name: "Knorr Cup Noodles Chicken", brand: "Knorr", category: "Cup Noodles", price: 50, quantity: "70 g", image: "/products/cupnoodles/cupnoodles_5.png" },
    { id: 38, name: "Nissin Cup Noodles Japanese Teriyaki", brand: "Nissin", category: "Cup Noodles", price: 50, quantity: "70 g", image: "/products/cupnoodles/cupnoodles_8.png" },

    // DAIRY
    // Row 1 (11 items: Bottles, Cartons, and Cups)
    { id: 48, name: "Nestle a+ Nourish Milk", brand: "Nestle", category: "Dairy", price: 66, quantity: "1 L", image: "/products/dairy/dairy_4.png" },
    { id: 49, name: "Lifeway Kefir", brand: "Lifeway", category: "Dairy", price: 60, quantity: "100 g", image: "/products/dairy/dairy_5.png" },
    { id: 50, name: "Lactaid 2% Reduced Fat Milk", brand: "Lactaid", category: "Dairy", price: 66, quantity: "1 L", image: "/products/dairy/dairy_6.png" },
    { id: 51, name: "Organic Valley Grassmilk", brand: "Organic", category: "Dairy", price: 66, quantity: "1 L", image: "/products/dairy/dairy_7.png" },
    { id: 52, name: "Amul Taaza Milk", brand: "Amul", category: "Dairy", price: 66, quantity: "1 L", image: "/products/dairy/dairy_8.png" },
    { id: 62, name: "Fairlife 2% Milk", brand: "Fairlife", category: "Dairy", price: 66, quantity: "1 L", image: "/products/dairy/dairy_18.png" },
    { id: 61, name: "Amul Fresh Cream", brand: "Amul", category: "Dairy", price: 50, quantity: "1 pc", image: "/products/dairy/dairy_17.png" },
    { id: 53, name: "Organic Valley Whole Milk", brand: "Organic", category: "Dairy", price: 66, quantity: "1 L", image: "/products/dairy/dairy_9.png" },
    { id: 54, name: "Silk Almond Milk", brand: "Silk", category: "Dairy", price: 66, quantity: "1 L", image: "/products/dairy/dairy_10.png" },
    { id: 59, name: "Amul Butter", brand: "Amul", category: "Dairy", price: 56, quantity: "100 g", image: "/products/dairy/dairy_15.png" },
    { id: 55, name: "Chobani Greek Yogurt", brand: "Chobani", category: "Dairy", price: 60, quantity: "100 g", image: "/products/dairy/dairy_11.png" },
    { id: 56, name: "Danone Greek Yogurt", brand: "Danone", category: "Dairy", price: 60, quantity: "100 g", image: "/products/dairy/dairy_12.png" },
    
    // Row 2 (7 items: remaining Cups, Tubs, Packets, Boxes)
    { id: 57, name: "Activia Yogurt", brand: "Activia", category: "Dairy", price: 60, quantity: "100 g", image: "/products/dairy/dairy_13.png" },
    { id: 60, name: "Milky Mist Paneer", brand: "Milky", category: "Dairy", price: 85, quantity: "200 g", image: "/products/dairy/dairy_16.png" },
    { id: 47, name: "Milky Mist Mozzarella Cheese", brand: "Milky", category: "Dairy", price: 66, quantity: "1 L", image: "/products/dairy/dairy_3.png" },
    { id: 45, name: "Eggland's Best Eggs", brand: "Eggland's", category: "Dairy", price: 90, quantity: "6 pcs", image: "/products/dairy/dairy_1.png" },
    { id: 46, name: "Philadelphia Cream Cheese", brand: "Philadelphia", category: "Dairy", price: 130, quantity: "200 g", image: "/products/dairy/dairy_2.png" },
    { id: 58, name: "Philadelphia Original Cream Cheese Box", brand: "Philadelphia", category: "Dairy", price: 130, quantity: "200 g", image: "/products/dairy/dairy_14.png" },

    // DRINKS
    // Cans & Paperboat (5 items)
    { id: 65, name: "Coca Cola Can", brand: "Coca", category: "Drinks", price: 40, quantity: "300 ml", image: "/products/drinks/drinks_3.png" },
    { id: 66, name: "Pepsi Can", brand: "Pepsi", category: "Drinks", price: 40, quantity: "300 ml", image: "/products/drinks/drinks_4.png" },
    { id: 70, name: "Red Bull Energy Drink", brand: "Red", category: "Drinks", price: 40, quantity: "300 ml", image: "/products/drinks/drinks_8.png" },
    { id: 71, name: "Monster Energy", brand: "Monster", category: "Drinks", price: 40, quantity: "300 ml", image: "/products/drinks/drinks_9.png" },
    { id: 80, name: "Paper Boat Aam Panna", brand: "Paper", category: "Drinks", price: 45, quantity: "500 ml", image: "/products/drinks/drinks_18.png" },

    // Cold Drinks Bottles (5 items)
    { id: 82, name: "Coca Cola Bottle", brand: "Coca", category: "Drinks", price: 45, quantity: "500 ml", image: "/products/drinks/drinks_20.png" },
    { id: 67, name: "Pepsi Bottle", brand: "Pepsi", category: "Drinks", price: 45, quantity: "500 ml", image: "/products/drinks/drinks_5.png" },
    { id: 68, name: "Sprite Bottle", brand: "Sprite", category: "Drinks", price: 45, quantity: "500 ml", image: "/products/drinks/drinks_6.png" },
    { id: 69, name: "Fanta Orange Bottle", brand: "Fanta", category: "Drinks", price: 45, quantity: "500 ml", image: "/products/drinks/drinks_7.png" },
    { id: 73, name: "Limca", brand: "Limca", category: "Drinks", price: 45, quantity: "500 ml", image: "/products/drinks/drinks_11.png" },

    // Water & Juice Bottles (5 items)
    { id: 72, name: "Aquafina Water", brand: "Aquafina", category: "Drinks", price: 20, quantity: "1 L", image: "/products/drinks/drinks_10.png" },
    { id: 63, name: "Bisleri Water", brand: "Bisleri", category: "Drinks", price: 20, quantity: "1 L", image: "/products/drinks/drinks_1.png" },
    { id: 64, name: "Tropicana 100% Orange Juice", brand: "Tropicana", category: "Drinks", price: 40, quantity: "300 ml", image: "/products/drinks/drinks_2.png" },
    { id: 76, name: "Maaza Mango Drink", brand: "Maaza", category: "Drinks", price: 45, quantity: "500 ml", image: "/products/drinks/drinks_14.png" },
    { id: 81, name: "Minute Maid Pulpy Orange Bottle", brand: "Minute", category: "Drinks", price: 45, quantity: "500 ml", image: "/products/drinks/drinks_19.png" },

    // Juice Bottles & Boxes (5 items)
    { id: 74, name: "Amul Kool Rose", brand: "Amul", category: "Drinks", price: 45, quantity: "500 ml", image: "/products/drinks/drinks_12.png" },
    { id: 75, name: "Slice Mango Drink", brand: "Slice", category: "Drinks", price: 45, quantity: "500 ml", image: "/products/drinks/drinks_13.png" },
    { id: 78, name: "Tropicana 100% Orange Juice Carton", brand: "Tropicana", category: "Drinks", price: 40, quantity: "300 ml", image: "/products/drinks/drinks_16.png" },
    { id: 79, name: "Real Fruit Power Mixed Fruit", brand: "Real", category: "Drinks", price: 110, quantity: "1 L", image: "/products/drinks/drinks_17.png" },
    { id: 77, name: "Minute Maid Pulpy Orange", brand: "Minute", category: "Drinks", price: 45, quantity: "500 ml", image: "/products/drinks/drinks_15.png" },

    // NOODLES
    { id: 83, name: "Maggi 2-Minute Noodles", brand: "Maggi", category: "Noodles", price: 14, quantity: "70 g", image: "/products/noodles/noodles_1.png" },
    { id: 84, name: "Knorr Chicken Noodles", brand: "Knorr", category: "Noodles", price: 20, quantity: "70 g", image: "/products/noodles/noodles_2.png" },
    { id: 85, name: "Maggi Kari Flavour", brand: "Maggi", category: "Noodles", price: 20, quantity: "70 g", image: "/products/noodles/noodles_3.png" },
    { id: 86, name: "Maggi Chicken Flavour", brand: "Maggi", category: "Noodles", price: 20, quantity: "70 g", image: "/products/noodles/noodles_4.png" },
    { id: 87, name: "Maggi Masala Blast", brand: "Maggi", category: "Noodles", price: 14, quantity: "70 g", image: "/products/noodles/noodles_5.png" },
    { id: 88, name: "Maggi 2-Minute Masala", brand: "Maggi", category: "Noodles", price: 14, quantity: "70 g", image: "/products/noodles/noodles_6.png" },
    { id: 89, name: "Samyang Buldak Hot Chicken", brand: "Samyang", category: "Noodles", price: 110, quantity: "120 g", image: "/products/noodles/noodles_7.png" },
    { id: 90, name: "Maggi Tomato Noodles", brand: "Maggi", category: "Noodles", price: 20, quantity: "70 g", image: "/products/noodles/noodles_8.png" },
    { id: 91, name: "Maggi 2-Minute Noodles Standard", brand: "Maggi", category: "Noodles", price: 14, quantity: "70 g", image: "/products/noodles/noodles_9.png" },
    { id: 92, name: "Maggi Masala Noodles Spicy", brand: "Maggi", category: "Noodles", price: 14, quantity: "70 g", image: "/products/noodles/noodles_10.png" },
    { id: 93, name: "Maggi Kari", brand: "Maggi", category: "Noodles", price: 20, quantity: "70 g", image: "/products/noodles/noodles_11.png" },
    { id: 94, name: "Maggi Masala Pack", brand: "Maggi", category: "Noodles", price: 14, quantity: "70 g", image: "/products/noodles/noodles_12.png" },
    { id: 95, name: "Nongshim Shin Ramyun", brand: "Nongshim", category: "Noodles", price: 110, quantity: "120 g", image: "/products/noodles/noodles_13.png" },
    { id: 96, name: "Indomie Mi Goreng", brand: "Indomie", category: "Noodles", price: 20, quantity: "70 g", image: "/products/noodles/noodles_14.png" },

    // MISCELLANEOUS
    { id: 97, name: "Brooke Bond Red Label Tea", brand: "Brooke", category: "Miscellaneous", price: 150, quantity: "250 g", image: "/products/random/random_1.png" },
    { id: 105, name: "Tata Tea Gold", brand: "Tata", category: "Miscellaneous", price: 150, quantity: "250 g", image: "/products/random/random_9.png" },
    { id: 101, name: "Nescafe Classic Coffee", brand: "Nescafe", category: "Miscellaneous", price: 100, quantity: "1 pack", image: "/products/random/random_5.png" },
    { id: 107, name: "Bournvita", brand: "Bournvita", category: "Miscellaneous", price: 100, quantity: "1 pack", image: "/products/random/random_11.png" },
    { id: 99, name: "Maggi Masala-ae-Magic", brand: "Maggi", category: "Miscellaneous", price: 75, quantity: "100 g", image: "/products/random/random_3.png" },
    { id: 98, name: "Everest Garam Masala", brand: "Everest", category: "Miscellaneous", price: 75, quantity: "100 g", image: "/products/random/random_2.png" },
    { id: 108, name: "Haldiram's Gulab Jamun", brand: "Haldiram", category: "Miscellaneous", price: 100, quantity: "1 pack", image: "/products/random/random_12.png" },
    
    { id: 102, name: "Tata Salt", brand: "Tata", category: "Miscellaneous", price: 28, quantity: "1 kg", image: "/products/random/random_6.png" },
    { id: 104, name: "Saffola Gold Oil", brand: "Saffola", category: "Miscellaneous", price: 160, quantity: "1 L", image: "/products/random/random_8.png" },
    { id: 100, name: "Fortune Sun Lite Sunflower Oil", brand: "Fortune", category: "Miscellaneous", price: 160, quantity: "1 L", image: "/products/random/random_4.png" },
    { id: 106, name: "Fortune Sun Lite Sunflower Oil Small", brand: "Fortune", category: "Miscellaneous", price: 160, quantity: "1 L", image: "/products/random/random_10.png" },
    { id: 103, name: "Aashirvaad Shudh Chakki Atta", brand: "Aashirvaad", category: "Miscellaneous", price: 220, quantity: "5 kg", image: "/products/random/random_7.png" },

    // SNACKS
    { id: 109, name: "Lay's Classic", brand: "Lay", category: "Snacks", price: 20, quantity: "50 g", image: "/products/snacks/snacks_1.png" },
    { id: 110, name: "Doritos Cool Ranch", brand: "Doritos", category: "Snacks", price: 20, quantity: "50 g", image: "/products/snacks/snacks_2.png" },
    { id: 111, name: "Kurkure Masala Munch", brand: "Kurkure", category: "Snacks", price: 20, quantity: "50 g", image: "/products/snacks/snacks_3.png" },
    { id: 112, name: "Cheetos Crunchy", brand: "Cheetos", category: "Snacks", price: 20, quantity: "50 g", image: "/products/snacks/snacks_4.png" },
    { id: 113, name: "Pringles Original", brand: "Pringles", category: "Snacks", price: 110, quantity: "110 g", image: "/products/snacks/snacks_5.png" },
    { id: 114, name: "Pringles Sour Cream & Onion", brand: "Pringles", category: "Snacks", price: 110, quantity: "110 g", image: "/products/snacks/snacks_6.png" },
    { id: 115, name: "Kettle Brand Potato Chips Sea Salt", brand: "Kettle", category: "Snacks", price: 20, quantity: "50 g", image: "/products/snacks/snacks_7.png" },
    { id: 116, name: "Uncle Chipps Plain Salted", brand: "Uncle", category: "Snacks", price: 20, quantity: "50 g", image: "/products/snacks/snacks_8.png" },
    { id: 117, name: "Bingo! Mad Angles Tomato Madness", brand: "Bingo!", category: "Snacks", price: 20, quantity: "50 g", image: "/products/snacks/snacks_9.png" },
    { id: 118, name: "Cheetos Crunchy Cheese", brand: "Cheetos", category: "Snacks", price: 20, quantity: "50 g", image: "/products/snacks/snacks_10.png" },
    { id: 119, name: "Doritos Sweet Chilli", brand: "Doritos", category: "Snacks", price: 20, quantity: "50 g", image: "/products/snacks/snacks_11.png" },
    { id: 120, name: "Doritos Nacho Cheese", brand: "Doritos", category: "Snacks", price: 20, quantity: "50 g", image: "/products/snacks/snacks_12.png" },
    { id: 121, name: "Lay's American Style Cream & Onion", brand: "Lay", category: "Snacks", price: 20, quantity: "50 g", image: "/products/snacks/snacks_13.png" },
    { id: 122, name: "Lay's Classic XL", brand: "Lay", category: "Snacks", price: 20, quantity: "50 g", image: "/products/snacks/snacks_14.png" },
    { id: 123, name: "Britannia Good Day Butter Cookies", brand: "Britannia", category: "Snacks", price: 25, quantity: "100 g", image: "/products/snacks/snacks_15.png" },
    { id: 124, name: "Sunfeast Marie Light", brand: "Sunfeast", category: "Snacks", price: 25, quantity: "100 g", image: "/products/snacks/snacks_16.png" },
    { id: 128, name: "Parle Marie Gold", brand: "Parle", category: "Snacks", price: 25, quantity: "100 g", image: "/products/snacks/snacks_20.png" },
    { id: 129, name: "Parle-G", brand: "Parle-G", category: "Snacks", price: 25, quantity: "100 g", image: "/products/snacks/snacks_21.png" },

    // SPREADS
    { id: 131, name: "Jif Creamy Peanut Butter", brand: "Jif", category: "Spreads", price: 160, quantity: "340 g", image: "/products/spreads/spreads_1.png" },
    { id: 132, name: "Hershey's Chocolate Syrup", brand: "Hershey", category: "Spreads", price: 150, quantity: "200 g", image: "/products/spreads/spreads_2.png" },
    { id: 133, name: "Skippy Creamy Peanut Butter", brand: "Skippy", category: "Spreads", price: 160, quantity: "340 g", image: "/products/spreads/spreads_3.png" },
    { id: 134, name: "Nutella Hazelnut Spread", brand: "Nutella", category: "Spreads", price: 350, quantity: "350 g", image: "/products/spreads/spreads_4.png" },
    { id: 135, name: "Kissan Mixed Fruit Jam", brand: "Kissan", category: "Spreads", price: 120, quantity: "500 g", image: "/products/spreads/spreads_5.png" },
    { id: 136, name: "Sundrop Peanut Butter", brand: "Sundrop", category: "Spreads", price: 160, quantity: "340 g", image: "/products/spreads/spreads_6.png" },

    // TOILETRIES
    { id: 142, name: "Dettol Original Soap", brand: "Dettol", category: "Toiletries", price: 40, quantity: "100 g", image: "/products/toiletries/toiletries_4.png" },
    { id: 149, name: "Lux Soft Glow Rose & Vitamin E Soap", brand: "Lux", category: "Toiletries", price: 40, quantity: "100 g", image: "/products/toiletries/toiletries_11.png" },
    { id: 150, name: "Dove Beauty Bar", brand: "Dove", category: "Toiletries", price: 40, quantity: "100 g", image: "/products/toiletries/toiletries_12.png" },
    
    { id: 147, name: "Axe Dark Temptation Body Spray", brand: "Axe", category: "Toiletries", price: 210, quantity: "150 ml", image: "/products/toiletries/toiletries_9.png" },
    { id: 146, name: "Rexona Men Cobalt Dry Deodorant", brand: "Rexona", category: "Toiletries", price: 210, quantity: "150 ml", image: "/products/toiletries/toiletries_8.png" },
    { id: 190, name: "Axe Dark Temptation Body Spray", brand: "Axe", category: "Toiletries", price: 210, quantity: "150 ml", image: "/products/toiletries/toiletries_9.png" },
    { id: 191, name: "Rexona Men Cobalt Dry Deodorant", brand: "Rexona", category: "Toiletries", price: 210, quantity: "150 ml", image: "/products/toiletries/toiletries_8.png" },
    { id: 139, name: "Gillette Mach3", brand: "Gillette", category: "Toiletries", price: 120, quantity: "1 pc", image: "/products/toiletries/toiletries_1.png" },
    
    { id: 143, name: "Head & Shoulders Classic Clean Shampoo", brand: "Head", category: "Toiletries", price: 165, quantity: "180 ml", image: "/products/toiletries/toiletries_5.png" },
    { id: 144, name: "Dove Deep Moisture Body Wash", brand: "Dove", category: "Toiletries", price: 165, quantity: "180 ml", image: "/products/toiletries/toiletries_6.png" },
    { id: 151, name: "Pantene Pro-V Smooth & Silky Shampoo", brand: "Pantene", category: "Toiletries", price: 165, quantity: "180 ml", image: "/products/toiletries/toiletries_13.png" },
    { id: 145, name: "Vaseline Intensive Care Deep Restore", brand: "Vaseline", category: "Toiletries", price: 100, quantity: "1 pc", image: "/products/toiletries/toiletries_7.png" },
    { id: 152, name: "Nivea Body Milk Nourishing", brand: "Nivea", category: "Toiletries", price: 100, quantity: "1 pc", image: "/products/toiletries/toiletries_14.png" },
    
    { id: 156, name: "Neutrogena Deep Clean Facial Cleanser", brand: "Neutrogena", category: "Toiletries", price: 165, quantity: "180 ml", image: "/products/toiletries/toiletries_18.png" },
    { id: 157, name: "Clean & Clear Deep Action Face Wash", brand: "Clean", category: "Toiletries", price: 165, quantity: "180 ml", image: "/products/toiletries/toiletries_19.png" },
    { id: 155, name: "Himalaya Purifying Neem Face Wash", brand: "Himalaya", category: "Toiletries", price: 165, quantity: "180 ml", image: "/products/toiletries/toiletries_17.png" },
    { id: 154, name: "Garnier Vitamin C Face Wash", brand: "Garnier", category: "Toiletries", price: 165, quantity: "180 ml", image: "/products/toiletries/toiletries_16.png" },
    
    { id: 141, name: "Listerine Cool Mint Mouthwash", brand: "Listerine", category: "Toiletries", price: 165, quantity: "180 ml", image: "/products/toiletries/toiletries_3.png" },
    { id: 148, name: "Closeup Everfresh Toothpaste", brand: "Closeup", category: "Toiletries", price: 65, quantity: "100 g", image: "/products/toiletries/toiletries_10.png" },
    { id: 153, name: "Colgate Strong Teeth Toothpaste", brand: "Colgate", category: "Toiletries", price: 65, quantity: "100 g", image: "/products/toiletries/toiletries_15.png" },
    { id: 140, name: "Oral-B Cross Action Toothbrush", brand: "Oral-B", category: "Toiletries", price: 120, quantity: "1 pc", image: "/products/toiletries/toiletries_2.png" },
    
    // VEGETABLES
    // Row 1: Leafy / Dark Greens
    { id: 224, name: "Fresh Spinach", brand: "Farm Fresh", category: "Vegetables", price: 30, quantity: "1 bunch", image: "/products/vegetables/vegetables_24.png" },
    { id: 223, name: "Fresh Celery", brand: "Farm Fresh", category: "Vegetables", price: 30, quantity: "1 bunch", image: "/products/vegetables/vegetables_23.png" },
    { id: 216, name: "Fresh Broccoli", brand: "Farm Fresh", category: "Vegetables", price: 60, quantity: "500 g", image: "/products/vegetables/vegetables_16.png" },
    { id: 212, name: "Fresh Artichoke", brand: "Farm Fresh", category: "Vegetables", price: 45, quantity: "500 g", image: "/products/vegetables/vegetables_12.png" },
    { id: 204, name: "Napa Cabbage", brand: "Farm Fresh", category: "Vegetables", price: 60, quantity: "500 g", image: "/products/vegetables/vegetables_4.png" },
    { id: 225, name: "Fresh Zucchini", brand: "Farm Fresh", category: "Vegetables", price: 45, quantity: "500 g", image: "/products/vegetables/vegetables_25.png" },
    { id: 207, name: "Asparagus", brand: "Farm Fresh", category: "Vegetables", price: 30, quantity: "1 bunch", image: "/products/vegetables/vegetables_7.png" },

    // Row 2: Beans, Peas, Whites
    { id: 209, name: "Green Beans", brand: "Farm Fresh", category: "Vegetables", price: 60, quantity: "500 g", image: "/products/vegetables/vegetables_9.png" },
    { id: 208, name: "Green Peas", brand: "Farm Fresh", category: "Vegetables", price: 60, quantity: "500 g", image: "/products/vegetables/vegetables_8.png" },
    { id: 206, name: "Fresh Okra", brand: "Farm Fresh", category: "Vegetables", price: 60, quantity: "500 g", image: "/products/vegetables/vegetables_6.png" },
    { id: 215, name: "Fresh Cauliflower", brand: "Farm Fresh", category: "Vegetables", price: 60, quantity: "500 g", image: "/products/vegetables/vegetables_15.png" },
    { id: 203, name: "White Mushrooms", brand: "Farm Fresh", category: "Vegetables", price: 50, quantity: "200 g", image: "/products/vegetables/vegetables_3.png" },
    { id: 221, name: "Fresh Turnip", brand: "Farm Fresh", category: "Vegetables", price: 45, quantity: "500 g", image: "/products/vegetables/vegetables_21.png" },
    { id: 211, name: "Bamboo Shoots", brand: "Farm Fresh", category: "Vegetables", price: 45, quantity: "500 g", image: "/products/vegetables/vegetables_11.png" },

    // Row 3: Reds, Purples & Oranges
    { id: 205, name: "Red Cabbage", brand: "Farm Fresh", category: "Vegetables", price: 60, quantity: "500 g", image: "/products/vegetables/vegetables_5.png" },
    { id: 222, name: "Fresh Beetroot", brand: "Farm Fresh", category: "Vegetables", price: 45, quantity: "500 g", image: "/products/vegetables/vegetables_22.png" },
    { id: 213, name: "Red Onion", brand: "Farm Fresh", category: "Vegetables", price: 40, quantity: "1 kg", image: "/products/vegetables/vegetables_13.png" },
    { id: 217, name: "Cherry Tomatoes", brand: "Farm Fresh", category: "Vegetables", price: 40, quantity: "1 kg", image: "/products/vegetables/vegetables_17.png" },
    { id: 220, name: "Fresh Radish", brand: "Farm Fresh", category: "Vegetables", price: 45, quantity: "500 g", image: "/products/vegetables/vegetables_20.png" },
    { id: 219, name: "Fresh Carrots", brand: "Farm Fresh", category: "Vegetables", price: 40, quantity: "1 kg", image: "/products/vegetables/vegetables_19.png" },
    { id: 210, name: "Sweet Potato", brand: "Farm Fresh", category: "Vegetables", price: 40, quantity: "1 kg", image: "/products/vegetables/vegetables_10.png" },

    // Row 4: Yellows & Roots
    { id: 226, name: "Fresh Pumpkin", brand: "Farm Fresh", category: "Vegetables", price: 45, quantity: "500 g", image: "/products/vegetables/vegetables_26.png" },
    { id: 227, name: "Fresh Squash", brand: "Farm Fresh", category: "Vegetables", price: 45, quantity: "500 g", image: "/products/vegetables/vegetables_27.png" },
    { id: 218, name: "Fresh Corn", brand: "Farm Fresh", category: "Vegetables", price: 45, quantity: "500 g", image: "/products/vegetables/vegetables_18.png" },
    { id: 214, name: "Fresh Potatoes", brand: "Farm Fresh", category: "Vegetables", price: 40, quantity: "1 kg", image: "/products/vegetables/vegetables_14.png" },
    { id: 202, name: "Fresh Ginger", brand: "Farm Fresh", category: "Vegetables", price: 25, quantity: "100 g", image: "/products/vegetables/vegetables_2.png" },
    { id: 201, name: "Turmeric Root", brand: "Farm Fresh", category: "Vegetables", price: 25, quantity: "100 g", image: "/products/vegetables/vegetables_1.png" },

    // FRUITS
    { id: 400, name: "Apple", brand: "Farm", category: "Fruits", price: 150, quantity: "1 kg", image: "/products/fruits/fruits_1.png" },
    { id: 401, name: "Banana", brand: "Farm", category: "Fruits", price: 60, quantity: "1 kg", image: "/products/fruits/fruits_2.png" },
    { id: 402, name: "Orange", brand: "Farm", category: "Fruits", price: 80, quantity: "1 kg", image: "/products/fruits/fruits_3.png" },
    { id: 403, name: "Grapes", brand: "Farm", category: "Fruits", price: 90, quantity: "500 g", image: "/products/fruits/fruits_4.png" },
    { id: 404, name: "Mango", brand: "Farm", category: "Fruits", price: 120, quantity: "1 kg", image: "/products/fruits/fruits_5.png" },
    { id: 405, name: "Pineapple", brand: "Farm", category: "Fruits", price: 150, quantity: "1 kg", image: "/products/fruits/fruits_6.png" },
    { id: 406, name: "Strawberry", brand: "Farm", category: "Fruits", price: 120, quantity: "250 g", image: "/products/fruits/fruits_7.png" },
    { id: 407, name: "Papaya", brand: "Farm", category: "Fruits", price: 70, quantity: "1 pc", image: "/products/fruits/fruits_8.png" },
    { id: 408, name: "Watermelon", brand: "Farm", category: "Fruits", price: 70, quantity: "1 pc", image: "/products/fruits/fruits_9.png" },
    { id: 409, name: "Kiwi", brand: "Farm", category: "Fruits", price: 120, quantity: "250 g", image: "/products/fruits/fruits_10.png" },
    { id: 410, name: "Pomegranate", brand: "Farm", category: "Fruits", price: 100, quantity: "1 kg", image: "/products/fruits/fruits_11.png" },
    { id: 411, name: "Guava", brand: "Farm", category: "Fruits", price: 100, quantity: "1 kg", image: "/products/fruits/fruits_12.png" },
    { id: 412, name: "Pear", brand: "Farm", category: "Fruits", price: 100, quantity: "1 kg", image: "/products/fruits/fruits_13.png" },
    { id: 413, name: "Peach", brand: "Farm", category: "Fruits", price: 100, quantity: "1 kg", image: "/products/fruits/fruits_14.png" },

    // PACKETS
    { id: 500, name: "Lays Classic", brand: "Lays", category: "Packets", price: 20, quantity: "50 g", image: "/products/packets/packets_1.png" },
    { id: 501, name: "Kurkure Masala", brand: "Kurkure", category: "Packets", price: 20, quantity: "50 g", image: "/products/packets/packets_2.png" },
    { id: 502, name: "Doritos Cheese", brand: "Doritos", category: "Packets", price: 20, quantity: "50 g", image: "/products/packets/packets_3.png" },
    { id: 503, name: "Pringles Original", brand: "Pringles", category: "Packets", price: 110, quantity: "110 g", image: "/products/packets/packets_4.png" },
    { id: 504, name: "Bingo Mad Angles", brand: "Bingo", category: "Packets", price: 20, quantity: "50 g", image: "/products/packets/packets_5.png" },
    { id: 505, name: "Cheetos", brand: "Cheetos", category: "Packets", price: 20, quantity: "50 g", image: "/products/packets/packets_6.png" },
    { id: 506, name: "Haldirams Bhujia", brand: "Haldirams", category: "Packets", price: 55, quantity: "200 g", image: "/products/packets/packets_7.png" },
    { id: 507, name: "Haldirams Mixture", brand: "Haldirams", category: "Packets", price: 55, quantity: "200 g", image: "/products/packets/packets_8.png" }
];
