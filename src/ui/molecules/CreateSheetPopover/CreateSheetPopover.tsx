import { ComponentProps, FC, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { sheetsAtom, sheetsCRUDService } from "@/lib/StateAtom";
import { useAtom } from "jotai";

interface CreateSheetPopoverProps extends ComponentProps<any> {}

export const CreateSheetPopover: FC<CreateSheetPopoverProps> = (props) => {
  const { style } = props;
  const [_, setSheets] = useAtom(sheetsAtom);

  const createNewSheet = useCallback((name: string) => {
    sheetsCRUDService.create({ name });
    const updated = sheetsCRUDService.readAll();
    /*prettier-ignore*/ console.log("[CreateSheetPopover.tsx,22] updated: ", updated);
    setSheets(updated);
  }, []);

  return (
    <Popover>
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
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  // get the value of the input field
                  const value = (e.target as any).value;
                  /*prettier-ignore*/ console.log("[CreateSheetPopover.tsx,57] value: ", value);
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
