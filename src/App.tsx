import { ComponentProps, FC } from "react";
import "./App.css";
import { ContentScriptPage } from "./ui/pages/ContentScriptPage";
import { DemoPage } from "./ui/pages/DemoPage";

interface Props extends ComponentProps<any> {
  root: HTMLElement | null;
}

export const App: FC<Props> = (props) => {
  const { root } = props;
  if (!root) return <div>Root not found</div>;

  const isLocalHost = window.location.hostname === "localhost";
  const isContent = root.dataset.isContent === "true";
  const isBrowserAction = root.dataset.isBrowserAction === "true";

  if (isLocalHost) return <DemoPage />;

  return (
    <>
      {isContent && <ContentScriptPage />}
      {isBrowserAction && <h1>Browser Action</h1>}
    </>
  );
};
