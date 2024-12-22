import { atom } from "jotai";
import { CRUDService } from "./CRUDService";
import { defaultWordEntry, IWordEntry } from "@/domain/types/types";

const wordsDatabase = new CRUDService<IWordEntry>([
  {
    id: "7aa69924",
    sheets: ["next.js"],
    text: "todo: selected",
    translation: "todo: translation",
    comment: "todo: comment",
    source:
      "file:///home/mine/dev/projects/word-extractor-react/src/ui/playground/playground.html",
  },
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
wordsDatabase.setDefault(defaultWordEntry);
const arr = wordsDatabase.readAll();
export const wordsDatabaseAtom = atom(arr);
