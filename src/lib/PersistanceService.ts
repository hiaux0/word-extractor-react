import { AnyObject } from "@/domain/types/types";

interface IPersistanceService {
  get: () => string[] | AnyObject;
  set: (value: string[]) => void;
}

export class LocalStorageService implements IPersistanceService {
  constructor(private key: string) {}

  get = () => {
    const value = localStorage.getItem(this.key);
    return value ? JSON.parse(value) : [];
  };

  set = (value: any) => {
    localStorage.setItem(this.key, JSON.stringify(value));
  };
}

export class BrowserMessageStorageService implements IPersistanceService {
  private db: any;
  constructor(private key: string) {}

  public openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.key, 1);

      request.onupgradeneeded = (event) => {
        const target = event.target as IDBOpenDBRequest | null;
        if (!target) return;
        const db = target.result;
        this.db = db;
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
      const transaction = this.db.transaction("dataStore", "readonly");
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

  set = (data: any) => {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction("dataStore", "readwrite");
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

export const localStorageService = new LocalStorageService("[WE]storage-local");
export const browserMessageStorageService = new BrowserMessageStorageService(
  "[WE]storage-message",
);
