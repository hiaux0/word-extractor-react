import { ComponentProps, FC } from "react";

interface TemplateProps extends ComponentProps<any> {}

export const Template: FC<TemplateProps> = (props) => {
  const { style } = props;
  return <div style={{ ...style }}></div>;
};
