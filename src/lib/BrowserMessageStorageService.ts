import { IPersistanceService } from "./PersistanceService";

let db: IDBDatabase;
class BrowserMessageStorageService implements IPersistanceService {
  constructor(private key: string) {}

  public openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.key, 1);

      request.onupgradeneeded = (event) => {
        const target = event.target as IDBOpenDBRequest | null;
        if (!target) return;
        db = target.result;
        /*prettier-ignore*/ console.log("[BrowserMessageStorageService.ts,16] this: ", this);
        if (!db.objectStoreNames.contains("dataStore")) {
          db.createObjectStore("dataStore", { keyPath: "id" });
        }
      };

      request.onsuccess = (event) => {
        const target = event.target as IDBOpenDBRequest | null;
        if (!target) return;
        resolve(target.result);
      };

      request.onerror = (event) => {
        const target = event.target as IDBOpenDBRequest | null;
        if (!target) return;
        reject(target.error);
      };
    });
  }

  public get() {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("dataStore", "readonly");
      const store = transaction.objectStore("dataStore");
      const request = store.get(1); // Get data with key `1`

      request.onsuccess = function (event: any) {
        resolve(event.target.result);
      };

      request.onerror = function (event: any) {
        reject("Error retrieving data: " + event.target.error);
      };
    });
  }

  public set = (data: any) => {
    return new Promise((resolve, reject) => {
      if (!db) return;
      const transaction = db.transaction("dataStore", "readwrite");
      const store = transaction.objectStore("dataStore");
      store.put(data);

      transaction.oncomplete = function () {
        resolve("Data saved successfully.");
      };

      transaction.onerror = function (event: any) {
        reject("Error saving data: " + event.target.error);
      };
    });
  };
}

export const browserMessageStorageService = new BrowserMessageStorageService(
  "[WE]storage-message",
);
