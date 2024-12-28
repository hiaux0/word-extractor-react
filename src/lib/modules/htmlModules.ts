import { SELECTORS } from "../common/constants";

export function getTextFromSelection() {
  try {
    const selection = window.getSelection();
    if (!selection) return;
    const range = selection.getRangeAt(0);
    const text = range.toString();
    return text;
  } catch {}
}

export function removeNewLines(input: string): string {
  return input.replace(/\n/g, " ");
}

export function getBody(): HTMLBodyElement {
  const body = document.getElementById(SELECTORS.body);
  return body as HTMLBodyElement;
}

export function getAppContainer(): HTMLBodyElement {
  const body = document.getElementById(SELECTORS.appContainer);
  return body as HTMLBodyElement;
}
