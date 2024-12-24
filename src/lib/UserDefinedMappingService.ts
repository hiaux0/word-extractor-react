import { ISelectItem, ISheet } from "@/domain/types/types";
import { TypeService } from "./TypeService";

export function mapSheetToSelectItem(sheet: ISheet): ISelectItem {
  const mapped = TypeService.mapKeys<ISheet, ISelectItem>(sheet, [
    ["id", "id"],
    ["name", "value"],
    ["name", "label"],
  ]);
  return mapped;
}
