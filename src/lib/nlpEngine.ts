import { products } from '@/data/products';
import { Product } from '@/types/product';
import { ActionType } from '@/types';

export type NLPResult = 
  | { type: 'INTENT'; action: ActionType }
  | { type: 'UNKNOWN'; originalText: string }
  | { type: 'ERROR'; message: string };

export const matchRealProduct = (phrase: string): Product | undefined => {
  const lowerPhrase = phrase.toLowerCase().trim();
  if (!lowerPhrase) return undefined;
  
  // Exact match
  const exact = products.find(p => p.name.toLowerCase() === lowerPhrase);
  if (exact) return exact;

  // Substring match
  const substring = products.find(p => p.name.toLowerCase().includes(lowerPhrase) || lowerPhrase.includes(p.name.toLowerCase()));
  if (substring) return substring;
  
  // Category match
  const singular = lowerPhrase.endsWith('s') ? lowerPhrase.slice(0, -1) : lowerPhrase;
  const singMatch = products.find(p => p.name.toLowerCase().includes(singular));
  if (singMatch) return singMatch;

  return undefined;
};

export const parseCommand = async (transcript: string): Promise<NLPResult> => {
  const lowerTranscript = transcript.toLowerCase().trim();
  if (!lowerTranscript) return { type: 'UNKNOWN', originalText: transcript };

  try {
    const res = await fetch('/api/nlp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript: lowerTranscript })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      if (err?.error) {
        return { type: 'ERROR', message: err.error };
      }
      console.warn('NLP API failed, falling back to manual handling');
      return { type: 'UNKNOWN', originalText: transcript };
    }

    const result = await res.json();
    return result as NLPResult;

  } catch (error: any) {
    console.error('Error calling NLP API:', error);
    return { type: 'ERROR', message: error?.message || 'Network error' };
  }
};
