import { IDatabase } from "@/domain/types/types";
import { IPersistanceService } from "./PersistanceService";

const dbKey = "clientData";

let db: IDBDatabase;
class BackgroundPersistanceService implements IPersistanceService {
  constructor(private key: string) {}

  public openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.key, 1);

      request.onupgradeneeded = (event) => {
        const target = event.target as IDBOpenDBRequest | null;
        if (!target) return;
        db = target.result;
        if (!db.objectStoreNames.contains("dataStore")) {
          db.createObjectStore("dataStore", {
            // keyPath: "id",
            autoIncrement: true,
          });
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

  public async getDatabase(): Promise<IDBDatabase> {
    if (db) return db;
    const openedDb = await this.openDatabase();
    return openedDb;
  }

  public get<T = IDatabase>(): Promise<T> {
    return new Promise(async (resolve, reject) => {
      // TODO: db is undefined
      const ensuredDb = await this.getDatabase();
      const transaction = ensuredDb.transaction("dataStore", "readwrite");
      const store = transaction.objectStore("dataStore");
      /*prettier-ignore*/ console.log("[B][ ] G GET [BackgroundPersistanceService.ts,50] store: ", store);
      store.getAll().onsuccess = function (event: any) {
        console.log("[B][ ] DDD Data:", event.target.result);
      };
      const request = store.get(dbKey); // Get data with key `1`

      request.onsuccess = function (event: any) {
        resolve(event.target.result);
      };

      request.onerror = function (event: any) {
        reject("Error retrieving data: " + event.target.error);
      };
    });
  }

  public set = (data: any) => {
    return new Promise(async (resolve, reject) => {
      /*prettier-ignore*/ console.log("[B][ ] S SET [BackgroundPersistanceService.ts,69] data: ", data);
      const ensuredDb = await this.getDatabase();
      const transaction = ensuredDb.transaction("dataStore", "readwrite");
      const store = transaction.objectStore("dataStore");
      store.put(data, dbKey);

      transaction.oncomplete = function () {
        resolve("Data saved successfully.");
      };

      transaction.onerror = function (event: any) {
        reject("Error saving data: " + event.target.error);
      };
    });
  };
}

export const backgroundPersistanceService = new BackgroundPersistanceService(
  "[WE]storage-message",
);
