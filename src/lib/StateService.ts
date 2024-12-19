import { atom } from "jotai";
import { CRUDService } from "./CRUDService";
import { defaultWordEntry, IWordEntry } from "@/domain/types/types";

const wordsDatabase = new CRUDService<IWordEntry>();
wordsDatabase.setDefault(defaultWordEntry);
const arr = wordsDatabase.readAll();
/*prettier-ignore*/ console.log("[StateService.ts,8] arr: ", arr);
export const wordsDatabaseAtom = atom(arr);
