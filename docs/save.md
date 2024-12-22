
--------------------------------------------------------------------------------------


--------------------------------------------------------------------------------------
export async function createEntry(entry: any) {
  const message = { action: "create", entry };
  return await sendMessageToBackgroundScript(message);
}

export async function readEntries() {
  const message = { action: "read" };
  return await sendMessageToBackgroundScript(message);
}

export async function updateEntry(entry: any) {
  const message = { action: "update", entry };
  return await sendMessageToBackgroundScript(message);
}

export async function deleteEntry(entryId: string) {
  const message = { action: "delete", entryId };
  return await sendMessageToBackgroundScript(message);
}
