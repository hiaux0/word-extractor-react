import { ComponentProps, FC, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import {
  selectedSheetAtom,
  sheetsAtom,
  sheetsCRUDService,
  wordsCRUDService,
  wordsListAtom,
} from "@/lib/StateAtom";
import { useAtom } from "jotai";
import { DEBUG_FLAGS } from "@/lib/common/appFlags";
import { generateMockWords } from "@/lib/modules/mockDataGenerator";

interface CreateSheetPopoverProps extends ComponentProps<any> {}

export const CreateSheetPopover: FC<CreateSheetPopoverProps> = (props) => {
  const { style } = props;
  const [_, setSheets] = useAtom(sheetsAtom);
  const [__, setWords] = useAtom(wordsListAtom);
  const [___, setSelectedSheet] = useAtom(selectedSheetAtom);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const createNewSheet = useCallback((name: string) => {
    const created = sheetsCRUDService.create({ name });
    if (!created) return;
    const updated = sheetsCRUDService.readAll();
    /*prettier-ignore*/ console.log("1. [CreateSheetPopover.tsx,22] updated: ", updated);
    setSelectedSheet(created);
    setSheets(updated);
    setValue("");
    setOpen(false);

    if (DEBUG_FLAGS.addMockData) {
      const mockWords = generateMockWords(10, created.id);
      wordsCRUDService.batchCreate(mockWords);
      const updatedWords = wordsCRUDService.readAll();
      setWords(updatedWords);
    }
  }, []);

  return (
    <Popover
      open={open}
      onOpenChange={(opened) => {
        setOpen(opened);
      }}
    >
      <PopoverTrigger asChild>
        <Button className="flex flex-grow justify-between">
          New sheet
          <Plus className="w-4 h-4 mr-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Create new sheet
            </h4>
            <p className="text-sm text-muted-foreground">
              1. Enter new sheet name
            </p>
            <p className="text-sm text-muted-foreground">
              2. Confirm with "Enter"
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid  gap-4">
              <Input
                id="width"
                placeholder="Sheet name"
                className="h-8"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  createNewSheet(value);
                }}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
