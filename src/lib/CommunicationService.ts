// @ts-nocheck

export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MyExtensionDB", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("dataStore")) {
        db.createObjectStore("dataStore", { keyPath: "id" });
      }
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export function saveData(db, data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("dataStore", "readwrite");
    const store = transaction.objectStore("dataStore");
    store.put(data);

    transaction.oncomplete = function () {
      resolve("Data saved successfully.");
    };

    transaction.onerror = function (event) {
      reject("Error saving data: " + event.target.error);
    };
  });
}

export function getData(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("dataStore", "readonly");
    const store = transaction.objectStore("dataStore");
    const request = store.get(1); // Get data with key `1`

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject("Error retrieving data: " + event.target.error);
    };
  });
}

