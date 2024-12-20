import { ComponentProps, FC } from "react";
import { AddTranslationCard } from "../organisms/AddTranslationCard";
import { Combobox } from "../organisms/Combobox/Combobox";
import LanguageTracker from "@/components/language-tracker";
import { Provider } from "jotai";

interface DemoPageProps extends ComponentProps<any> {}

export const DemoPage: FC<DemoPageProps> = (props) => {
  const { style } = props;
  return (
    <div>
      <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />

      <LanguageTracker />
      <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />

      <Combobox items={[]} />
      <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr /> <hr />

      <AddTranslationCard />
    </div>
  );
};
