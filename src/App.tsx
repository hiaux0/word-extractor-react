import { ComponentProps, FC } from "react";
import "./App.css";
import { ContentScriptPage } from "./ui/pages/ContentScriptPage";

interface Props extends ComponentProps<any> {
  root: HTMLElement | null;
}

export const App: FC<Props> = (props) => {
  const { root } = props;
  if (!root) return <div>Root not found</div>;

  const isContent = root.dataset.isContent === "true";
  const isBrowserAction = root.dataset.isBrowserAction === "true";

  return (
    <>
      {isContent && <ContentScriptPage />}
      {isBrowserAction && <h1>Browser Action</h1>}
    </>
  );
};
