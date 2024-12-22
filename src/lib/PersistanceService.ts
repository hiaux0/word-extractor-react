import { AnyObject } from "@/domain/types/types";

export interface IPersistanceService {
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


export const localStorageService = new LocalStorageService("[WE]storage-local");
