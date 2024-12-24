import { atom, createStore } from "jotai";
import { CRUDService } from "./CRUDService";
import {
  defaultSheet,
  defaultWordEntry,
  IDatabase,
  ISheet,
  IWordEntry,
} from "@/domain/types/types";

const store = createStore();

const countAtom = atom(0);
store.set(countAtom, 1);

export const wordsCRUDService = new CRUDService<IWordEntry>([
  //{
  //  id: "7aa69924",
  //  sheets: ["next.js"],
  //  text: "todo: selected",
  //  translation: "todo: translation",
  //  comment: "todo: comment",
  //  source:
  //    "file:///home/mine/dev/projects/word-extractor-react/src/ui/playground/playground.html",
  //},
  //{
  //  id: "8bd380a6",
  //  sheets: ["next.js"],
  //  text: "todo: selected",
  //  translation: "todo: translation",
  //  comment: "todo: comment",
  //  source:
  //    "file:///home/mine/dev/projects/word-extractor-react/src/ui/playground/playground.html",
  //},
]);
wordsCRUDService.setDefault(defaultWordEntry);
const arr = wordsCRUDService.readAll();

export const wordsListAtom = atom(arr);

export const sheetsCRUDService = new CRUDService<ISheet>([]);
sheetsCRUDService.setDefault(defaultSheet);
export const sheetsAtom = atom<ISheet[]>([]);

export const selectedSheetAtom = atom<ISheet>(defaultSheet);
