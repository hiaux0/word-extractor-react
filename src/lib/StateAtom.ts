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

const unassignedSheet: ISheet = {
  ...defaultSheet,
  name: "Unassigned",
};
export const sheetsCRUDService = new CRUDService<ISheet>([unassignedSheet]);
sheetsCRUDService.setDefault(defaultSheet);
const sheets = sheetsCRUDService.readAll();
export const sheetsAtom = atom<ISheet[]>(sheets);

export const selectedSheetAtom = atom<ISheet>(unassignedSheet);
