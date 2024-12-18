import { ComponentProps, FC } from "react";

interface DemoPageProps extends ComponentProps<any> {}

export const DemoPage: FC<DemoPageProps> = (props) => {
  const { style } = props;
  return <div style={{ ...style }}>DemoPage</div>;
};
