("use client");
import {
  ComponentProps,
  FC,
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
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

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [searchValue, items]);

  const reset = useCallback(() => {
    setOpen(false);
    setSearchValue("");
  }, []);

  const addNewItem = useCallback(() => {
    onAddNewItem?.(searchValue);
    setValue(searchValue);
    reset();
  }, [onAddNewItem, searchValue]);

  const handleEnter = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;
      if (filteredItems.length > 0) return; // still items? then return

      addNewItem();
    },
    [searchValue],
  );

  useEffect(() => {
    setValue(activeItem?.value ?? "");
  }, [activeItem]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between !border !border-input !border-solid"
        >
          {value ? (
            items.find((item) => item.value === value)?.label
          ) : items.length === 0 ? (
            <div className="text-muted-foreground">No items yet. Add now</div>
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
            onKeyDown={handleEnter}
          />
          <CommandList>
            <CommandEmpty>
              {onAddNewItem && searchValue ? (
                <>
                  <div className="text-muted-foreground">
                    Press "Enter" to confirm
                  </div>
                  <Button size="sm" onClick={addNewItem}>
                    Add new item "{searchValue}"
                  </Button>
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
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onSelectItem?.(item);
                    reset();
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
