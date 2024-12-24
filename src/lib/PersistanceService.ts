import { AnyObject, IDatabase } from "@/domain/types/types";

export interface IPersistanceService<T> {
  get: () => T | string[] | AnyObject;
  set: (value: string[]) => void;
}

export class LocalStorageService<T = IDatabase>
  implements IPersistanceService<T>
{
  constructor(private key: string) {}

  get = (): T => {
    const value = localStorage.getItem(this.key);
    return value ? JSON.parse(value) : undefined;
  };

  set = (value: any) => {
    localStorage.setItem(this.key, JSON.stringify(value));
  };
}

export const localStorageService = new LocalStorageService("[WE]storage-local");
