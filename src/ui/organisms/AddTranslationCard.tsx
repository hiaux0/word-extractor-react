import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useState } from "react";
import { Combobox } from "./Combobox/Combobox";
import { ISelectItem, ISheet, IWordEntry } from "@/domain/types/types";
import { CRUDService } from "@/lib/CRUDService";
import { mapSheetToSelectItem } from "@/lib/UserDefinedMappingService";
import { useAtom } from "jotai";
import { wordsDatabaseAtom } from "@/lib/StateAtom";

const frameworks: ISelectItem[] = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

// const dbMap = new CRUDMapService<IWordEntry>();
const sheetsDatabase = new CRUDService<ISheet>();
const wordsDatabase = new CRUDService<IWordEntry>();

export function AddTranslationCard() {
  const [words, setWords] = useAtom(wordsDatabaseAtom);

  const [inputSheet, selectInputSheet] = useState(frameworks[0]);
  const [translation, addTranslation] = useState("");
  const [comment, addComment] = useState("");
  const [sheets, setSheets] = useState(frameworks);

  const createTranslation = useCallback(() => {
    const source = window.location.href;
    wordsDatabase.replace(words);
    wordsDatabase.create({
      sheets: [inputSheet.value],
      text: "todo: selected",
      //translation,
      //comment,
      translation: "todo: translation",
      comment: "todo: comment",
      source,
    });

    const updated = wordsDatabase.readAll(true);
    setWords(updated);
  }, [inputSheet, translation, comment]);

  const addNewSheet = useCallback((newItem: string) => {
    const created = sheetsDatabase.create({ name: newItem });
    if (!created) return;
    const updated = sheetsDatabase.readAll();

    const mapped = mapSheetToSelectItem(created);
    const mappedArray = updated.map(mapSheetToSelectItem);

    if (mapped) selectInputSheet(mapped);
    setSheets(mappedArray);
  }, []);

  return (
    <Card className="w-[350px]">
      <CardContent className="py-6">
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Input sheet</Label>
              <Combobox
                items={sheets}
                activeItem={inputSheet}
                placeholder="Select sheet"
                onAddNewItem={addNewSheet}
                onSelectItem={selectInputSheet}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">My translation</Label>
              <Input
                id="name"
                onChange={(event) => addTranslation(event.target.value)}
                autoFocus
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Comment</Label>
              <Textarea
                id="name"
                onChange={(event) => addComment(event.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button size="sm" onClick={() => createTranslation()}>
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}

//<CardHeader>
//  <CardTitle>Create project</CardTitle>
//  <CardDescription>Deploy your new project in one-click.</CardDescription>
//</CardHeader>
