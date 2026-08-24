import { NextResponse } from 'next/server';
import { products } from '@/data/products';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();

    if (!GEMINI_API_KEY) {
      // Fallback for missing API key: send an error response that the frontend can handle gracefully.
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured. Please add it to your .env.local file.' }, { status: 500 });
    }

    const systemPrompt = `You are an intelligent NLP parser for a Voice Shopping Mart.
The user will provide a voice command transcript. Your job is to parse it into ONE of the following JSON actions.
Reply ONLY with valid JSON. Do not add markdown backticks like \`\`\`json. Just the raw JSON object.

Available Products:
${products.map(p => `- ${p.name} (${p.category})`).join('\n')}

Rules for mapping to a product and units:
- ALWAYS favor an exact or close match from the available products list.
- Standardize the "unit" strictly to one of: "g", "kg", "pc", "dozen", "bunch", or "pack".
- If the category is "Fruits" or "Vegetables" and the user asks for a weight less than 100g (e.g. 50g), enforce a minimum of 100g (set quantity: 100, unit: "g").
- Output the raw number in quantity and the string in unit (e.g., quantity: 500, unit: "g").

Available Actions:
1. ADD_ITEM
{
  "type": "INTENT",
  "action": {
    "type": "ADD_ITEM",
    "payload": {
      "name": "<Product Name exactly as in the Available Products>",
      "quantity": <number>,
      "category": "<Category>",
      "unit": "<e.g., 1 kg, bottles, packets, pieces>"
    }
  }
}

2. REMOVE_ITEM
{ "type": "INTENT", "action": { "type": "REMOVE_ITEM", "payload": "<Product Name>" } }

3. UPDATE_QUANTITY
{ "type": "INTENT", "action": { "type": "UPDATE_QUANTITY", "payload": { "name": "<Product Name>", "quantity": <number> } } }

4. CLEAR_LIST
{ "type": "INTENT", "action": { "type": "CLEAR_LIST" } }

5. SEARCH (for filtering items)
{ "type": "INTENT", "action": { "type": "SET_SEARCH_QUERY", "payload": { "term": "<search term>", "maxPrice": <optional number>, "brand": "<optional string>" } } }

6. OPEN CART
{ "type": "INTENT", "action": { "type": "OPEN_CART" } }

7. CHANGE LANGUAGE
If the user explicitly asks to change the language, or if they speak a different language (e.g., French, Hindi) and it implies they want to use that language.
{ "type": "INTENT", "action": { "type": "CHANGE_LANGUAGE", "payload": { "langCode": "<e.g. en, hi, fr, es, de, ta, te>" } } }

8. UNKNOWN (if it cannot be parsed)
{ "type": "UNKNOWN", "originalText": "<original transcript>" }

Transcript: "${transcript}"
`;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: systemPrompt }]
        }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      throw new Error(`Gemini API responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!resultText) {
      throw new Error('Invalid response format from Gemini API');
    }

    // Try to parse the JSON returned by Gemini
    const cleanText = resultText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsedAction = JSON.parse(cleanText);
    return NextResponse.json(parsedAction);

  } catch (error: any) {
    console.error('Error in NLP route:', error);
    return NextResponse.json(
      { error: 'Failed to process voice command via AI.', details: error.toString(), stack: error.stack },
      { status: 500 }
    );
  }
}
