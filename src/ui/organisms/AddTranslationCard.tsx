import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Combobox } from "./Combobox/Combobox";
import { mapSheetToSelectItem } from "@/lib/UserDefinedMappingService";
import { useAtom } from "jotai";
import {
  selectedSheetAtom,
  sheetsAtom,
  sheetsCRUDService,
  wordsCRUDService,
  wordsListAtom,
} from "@/lib/StateAtom";
import { getTextFromSelection } from "@/lib/modules/htmlModules";
import { ModeToggle } from "@/components/mode-toggle";
import { DragWrapper } from "../atoms/DragButton/DragWrapper";

interface AddTranslationCardProps extends ComponentProps<any> {
  text?: string;
  onAdd?: () => void;
}

export function AddTranslationCard(props: AddTranslationCardProps) {
  const { onAdd, text } = props;

  const [words, setWords] = useAtom(wordsListAtom);
  const [sheets, setSheets] = useAtom(sheetsAtom);
  const [selectedSheet, setSelectedSheet] = useAtom(selectedSheetAtom);
  const [textValue, setTextValue] = useState(
    (text || getTextFromSelection())?.trim(),
  );
  const [translation, addTranslation] = useState("");
  const [comment, addComment] = useState("");

  const sheetsAsUIItems = useMemo(
    () => sheets.map(mapSheetToSelectItem),
    [sheets],
  );
  const selectedSheetAsUIItem = useMemo(
    () => mapSheetToSelectItem(selectedSheet),
    [selectedSheet],
  );

  const createTranslation = useCallback(() => {
    const source = window.location.href;
    wordsCRUDService.replace(words);
    wordsCRUDService.create({
      sheets: [selectedSheet.id],
      text: textValue,
      translation,
      comment,
      //translation: "todo: translation",
      //comment: "todo: comment",
      source,
    });

    const updated = wordsCRUDService.readAll(true);
    setWords(updated);
    onAdd?.();
  }, [selectedSheet, translation, comment, textValue]);

  const addNewSheet = useCallback((newItem: string) => {
    const created = sheetsCRUDService.create({ name: newItem });
    if (!created) return;
    const updated = sheetsCRUDService.readAll();
    setSheets(updated);
    setSelectedSheet(created);
  }, []);

  useEffect(() => {
    setTextValue(text?.trim());
  }, [text]);

  return (
    <DragWrapper style={{ position: "relative" }}>
      <Card className="w-[350px] shadow">
        <CardContent className="p-4">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex justify-between">
                <div className="flex flex-col space-y-1.5">
                  <Label>Input sheet</Label>
                  <Combobox
                    items={sheetsAsUIItems}
                    activeItem={selectedSheetAsUIItem}
                    placeholder="Select sheet"
                    onAddNewItem={addNewSheet}
                    onSelectItem={(item) => {
                      const found = sheetsCRUDService.readById(item.id);
                      if (!found) return;
                      setSelectedSheet(found);
                    }}
                  />
                </div>
                <ModeToggle />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="text">Text</Label>
                <Textarea
                  id="text"
                  value={textValue}
                  onChange={(event) => setTextValue(event.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">My translation</Label>
                <Textarea
                  id="name"
                  onChange={(event) => addTranslation(event.target.value)}
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
        <CardFooter className="flex justify-between pb-4">
          <Button size="sm" onClick={() => createTranslation()}>
            Add
          </Button>
        </CardFooter>
      </Card>
    </DragWrapper>
  );
}

//<CardHeader>
//  <CardTitle>Create project</CardTitle>
//  <CardDescription>Deploy your new project in one-click.</CardDescription>
//</CardHeader>
