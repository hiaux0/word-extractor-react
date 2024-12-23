import { ComponentProps, FC } from "react";
import { AddTranslationCard } from "../organisms/AddTranslationCard";
import { Combobox } from "../organisms/Combobox/Combobox";
import LanguageTracker from "@/components/language-tracker";
import { DataTableDemo } from "../organisms/DataTable/DataTableDemo";
import { AppSidebarDemo } from "../organisms/AppSidebar/AppSidebarDemo";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TypographyDemo } from "../atoms/TypographyDemo";
import { PopoverDemo } from "../molecules/PopoverDemo";
import { CreateSheetPopoverDemo } from "../molecules/CreateSheetPopover/CreateSheetPopoverDemo";

interface DemoPageProps extends ComponentProps<any> {}

export const DemoPage: FC<DemoPageProps> = (props) => {
  const { style } = props;
  return (
    <div>
      <h1>CreateSheetPopoverDemo</h1>
      <CreateSheetPopoverDemo />
      <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />

      <div style={{ display: "flex" }}>
        <h1>AppSidebarDemo</h1>
        <SidebarTrigger />
      </div>
      <AppSidebarDemo />
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
      <h1>LanguageTracker</h1>
      <LanguageTracker />
      <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
      <Combobox items={[]} />
      <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />
      <AddTranslationCard />
    </div>
  );
};
