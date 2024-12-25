export function getTextFromSelection() {
  try {
    const selection = window.getSelection();
    if (!selection) return;
    const range = selection.getRangeAt(0);
    const text = range.toString();
    return text;
  } catch {}
}
