import { IWordEntry } from "@/domain/types/types";
import { generateId } from "./generateId";

export function generateMockWords(amount = 10, sheetId?: string): IWordEntry[] {
  const prefix = generateId().substring(0, 3);
  const words = [];
  for (let i = 0; i < amount; i++) {
    const word: IWordEntry = {
      id: generateId(),
      created: new Date().toISOString(),
      text: `${prefix} text ${i}`,
      translation: `${prefix} translation ${i}`,
      comment: `${prefix} comment ${i}`,
      source: `${prefix} source ${i}`,
      sheets: sheetId ? [sheetId] : [],
    };
    words.push(word);
  }
  return words;
}
