export function getTextFromSelection() {
  try {
    const selection = window.getSelection();
    if (!selection) return;
    const range = selection.getRangeAt(0);
    /*prettier-ignore*/ console.log("[content_script.js,71] range: ", range);
    const text = range.toString();
    /*prettier-ignore*/ console.log("[htmlModules.ts,7] text: ", text);
    return text;
  } catch {}
}
