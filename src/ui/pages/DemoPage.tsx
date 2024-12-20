import { ComponentProps, FC } from "react";
import { AddTranslationCard } from "../organisms/AddTranslationCard";
import { Combobox } from "../organisms/Combobox/Combobox";
import LanguageTracker from "@/components/language-tracker";
import { Provider } from "jotai";
import { DataTableDemo } from "../organisms/DataTable/DataTableDemo";

interface DemoPageProps extends ComponentProps<any> {}

export const DemoPage: FC<DemoPageProps> = (props) => {
  const { style } = props;
  return (
    <div>
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
