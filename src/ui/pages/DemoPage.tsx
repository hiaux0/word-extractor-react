import { ComponentProps, FC } from "react";
import { AddTranslationCard } from "../organisms/AddTranslationCard";
import { Combobox } from "../organisms/Combobox/Combobox";

interface DemoPageProps extends ComponentProps<any> {}

export const DemoPage: FC<DemoPageProps> = (props) => {
  const { style } = props;
  return (
    <>
      <Combobox items={[]} />
      <br />

      <AddTranslationCard />
    </>
  );
};
