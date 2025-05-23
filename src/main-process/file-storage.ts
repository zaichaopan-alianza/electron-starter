import Store from "electron-store";
import type {ZodType } from "zod/v4";

export class Storage {
  private store: Store;

  constructor(storeInstance: Store) {
    this.store = storeInstance;
  }

  getItem<T>(key: string, schema: ZodType<T>, defaultValue: T): T;
  getItem(key: string): unknown;
  getItem<T>(
    key: string,
    schema?: ZodType<T>,
    defaultValue?: T
  ): T | unknown {
    const storedValue = this.store.get(key);
    if (schema !== undefined && defaultValue !== undefined) {
      const result = schema.safeParse(storedValue);
      result.success ? result.data : defaultValue;
    }
    return storedValue;
  }

  setItem(key: string, value: unknown) {
    this.store.set(key, value);
  }
}

export const storage = new Storage(new Store());
