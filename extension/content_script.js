console.log("Extension content script is active.");

function sendMessageToBackgroundScript(message) {
  return new Promise((resolve, reject) => {
    browser.runtime.sendMessage(message, (response) => {
      if (response && response.error) {
        reject(response.error);
      } else {
        resolve(response);
      }
    });
  });
}

async function createEntry(entry) {
  const message = { action: "create", entry };
  return await sendMessageToBackgroundScript(message);
}

async function readEntries() {
  const message = { action: "read" };
  return await sendMessageToBackgroundScript(message);
}

async function updateEntry(entry) {
  const message = { action: "update", entry };
  return await sendMessageToBackgroundScript(message);
}

async function deleteEntry(entryId) {
  const message = { action: "delete", entryId };
  return await sendMessageToBackgroundScript(message);
}
