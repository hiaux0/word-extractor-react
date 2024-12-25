import { ComponentProps, FC } from "react";
import { AddTranslationCard } from "../organisms/AddTranslationCard";
import { Combobox } from "../organisms/Combobox/Combobox";
import { DataTableDemo } from "../organisms/DataTable/DataTableDemo";
import { AppSidebarDemo } from "../organisms/AppSidebar/AppSidebarDemo";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TypographyDemo } from "../atoms/TypographyDemo";
import { PopoverDemo } from "../molecules/PopoverDemo";
import { CreateSheetPopoverDemo } from "../molecules/CreateSheetPopover/CreateSheetPopoverDemo";
import { DragWrapper } from "../atoms/DragButton/DragWrapper";
import { DebounceDemo } from "../playground/DebounceDemo";
import { DragButton } from "../atoms/DragButton/DragButton";

interface DemoPageProps extends ComponentProps<any> {}

const show = false;

export const DemoPage: FC<DemoPageProps> = (props) => {
  const { style } = props;
  return (
    <div>
      <h1>DebounceDemo</h1>
      <DebounceDemo />
      <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
      <h1>DragWrapper</h1>
      <AddTranslationCard />
      <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
      <h1>CreateSheetPopoverDemo</h1>
      <CreateSheetPopoverDemo />
      <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
      <div style={{ display: "flex" }} className="justify-end">
        <h1>AppSidebarDemo</h1>
        <SidebarTrigger />
      </div>
      {show && <AppSidebarDemo />}
      <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
      <h1>PopoverDemo</h1>
      <PopoverDemo />
      <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
      <h1>TypographyDemo</h1>
      <TypographyDemo />
      <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
      <h1>DataTableDemo</h1>
      <DataTableDemo />
      <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
      <Combobox items={[]} />
      <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
      <AddTranslationCard />
    </div>
  );
};
