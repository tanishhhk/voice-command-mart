const fs = require('fs');

async function extract() {
    const originalContent = fs.readFileSync('original_shelf.tsx', 'utf16le');
    // Extract just FridgeSection
    const start = originalContent.indexOf('function FridgeSection() {');
    // Find the end of FridgeSection. It's followed by `export default function ShelfBackground() {`
    const end = originalContent.indexOf('export default function ShelfBackground() {');
    
    if (start > -1 && end > -1) {
        fs.writeFileSync('extracted_fridge.tsx', originalContent.substring(start, end));
        console.log('Successfully extracted FridgeSection');
    } else {
        console.log('Failed to extract FridgeSection');
    }
}
extract();
