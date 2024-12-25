import { atom, createStore } from "jotai";
import { CRUDService } from "./CRUDService";
import {
  defaultSheet,
  defaultWordEntry,
  ISheet,
  IWordEntry,
} from "@/domain/types/types";

const store = createStore();

const countAtom = atom(0);
store.set(countAtom, 1);

export const wordsCRUDService = new CRUDService<IWordEntry>([]);
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
