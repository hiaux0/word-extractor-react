("use client");
import {
  ComponentProps,
  FC,
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useState,
} from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ISelectItem } from "@/domain/types/types";

interface ComboboxProps extends ComponentProps<any> {
  items: ISelectItem[];
  activeItem?: ISelectItem;
  placeholder?: string;
  onAddNewItem?: (itemName: string) => void;
  onSelectItem?: (item: ISelectItem) => void;
}

export const Combobox: FC<ComboboxProps> = (props) => {
  const { style, activeItem, onAddNewItem, onSelectItem, items, placeholder } =
    props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(activeItem?.value ?? "");
  const [searchValue, setSearchValue] = useState("");

  const addNewItem = useCallback(() => {
    /*prettier-ignore*/ console.log("[Combobox.tsx,43] searchValue: ", searchValue);
    onAddNewItem?.(searchValue);
    setValue(searchValue);
    setOpen(false);
  }, [onAddNewItem, searchValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between "
        >
          {value ? (
            items.find((item) => item.value === value)?.label
          ) : items.length === 0 ? (
            <div className="text-muted-foreground">No items yet. Add</div>
          ) : (
            placeholder && (
              <div className="text-muted-foreground">Select item...</div>
            )
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={items.length ? "Search item..." : "Enter new item..."}
            onValueChange={setSearchValue}
            onKeyDown={(event) => event.key === "Enter" && addNewItem()}
          />
          <CommandList>
            <CommandEmpty>
              {onAddNewItem && searchValue ? (
                <>
                  <Button size="sm" onClick={addNewItem}>
                    Add new item "{searchValue}"
                  </Button>
                  <div className="text-muted-foreground">
                    Press "Enter" to confirm
                  </div>
                </>
              ) : (
                <>
                  {items.length ? (
                    <>No item found.</>
                  ) : (
                    <div className="text-muted-foreground">
                      You may add a new item by typing in the input
                    </div>
                  )}
                </>
              )}
            </CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onSelectItem?.(item);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
