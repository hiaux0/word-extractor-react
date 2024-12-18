import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useState } from "react";
import { Combobox } from "./Combobox/Combobox";
import { CRUDService } from "@/lib/CRUDService";
import { ISelectItem } from "@/domain/types/types";

const frameworks: ISelectItem[] = [
  //{
  //  value: "next.js",
  //  label: "Next.js",
  //},
  //{
  //  value: "sveltekit",
  //  label: "SvelteKit",
  //},
  //{
  //  value: "nuxt.js",
  //  label: "Nuxt.js",
  //},
  //{
  //  value: "remix",
  //  label: "Remix",
  //},
  //{
  //  value: "astro",
  //  label: "Astro",
  //},
];

const sheetsCRUD = new CRUDService<ISelectItem>(frameworks);

export function AddTranslationCard() {
  const [inputSheet, selectInputSheet] = useState(frameworks[0]);
  /*prettier-ignore*/ console.log("-------------------------------------------------------------------");
  /*prettier-ignore*/ console.log("[AddTranslationCard.tsx,46] inputSheet: ", inputSheet);
  const [translation, addTranslation] = useState("");
  const [comment, addComment] = useState("");
  const [sheets, setSheets] = useState(frameworks);

  const completeTranslation = useCallback(() => {
    const asht = [inputSheet, translation, comment];
    /*prettier-ignore*/ console.log("[AddTranslationCard.tsx,54] asht: ", asht);
  }, [inputSheet, translation, comment]);

  const addNewItem = useCallback((newItem: string) => {
    const created = sheetsCRUD.create({ value: newItem, label: newItem });
    const updated = sheetsCRUD.readAll();
    setSheets(updated);
    if (created) selectInputSheet(created);
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
                onAddNewItem={addNewItem}
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
        <Button size="sm" onClick={() => completeTranslation()}>
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
