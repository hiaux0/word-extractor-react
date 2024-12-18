import { ComponentProps, FC } from "react";
import "./BrowserActionApp.css";

interface Props extends ComponentProps<any> {
  root: HTMLElement | null;
}

export const BrowserActionApp: FC<Props> = (props) => {
  const { root } = props;
  if (!root) return <div>Root not found</div>;

  const isContent = root.dataset.isContent === "true";
  const isBrowserAction = root.dataset.isBrowserAction === "true";

  return (
    <>
      {isContent && <h1>Content Script</h1>}
      {isBrowserAction && <h1>Browser Action</h1>}
    </>
  );
};
