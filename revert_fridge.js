const fs = require('fs');

const original = fs.readFileSync('extracted_fridge.tsx', 'utf8');
const current = fs.readFileSync('src/components/shelves/ShelfBackground.tsx', 'utf8');

const startIdx = current.indexOf('function FridgeSection() {');
const endIdx = current.indexOf('/* ━━ Vegetable Section (wooden crate cubbies) ━━━━━━━━━━━━━━━━━━━━━━━━━ */');

if (startIdx > -1 && endIdx > -1) {
    const newContent = current.substring(0, startIdx) + original.trim() + '\n\n' + current.substring(endIdx);
    fs.writeFileSync('src/components/shelves/ShelfBackground.tsx', newContent);
    console.log('Successfully reverted FridgeSection');
} else {
    console.log('Could not find boundaries');
}
