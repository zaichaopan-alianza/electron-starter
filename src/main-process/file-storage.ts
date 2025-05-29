import Store from "electron-store";
import * as v from "valibot";
import type { BaseIssue, BaseSchema } from "valibot";

console.log("v", v.safeParse);

export class Storage {
  private store: Store;

  constructor(storeInstance: Store) {
    this.store = storeInstance;
  }

  getItem<T>(
    key: string,
    schema: BaseSchema<unknown, T, BaseIssue<unknown>>,
    defaultValue: T
  ): T;
  getItem(key: string): unknown;
  getItem<T>(
    key: string,
    schema?: BaseSchema<unknown, T, BaseIssue<unknown>>,
    defaultValue?: T
  ): T | unknown {
    const storedValue = this.store.get(key);
    if (schema !== undefined && defaultValue !== undefined) {
      const result = v.safeParse(schema, storedValue);
      result.success ? result.output : defaultValue;
    }
    return storedValue;
  }

  setItem(key: string, value: unknown) {
    this.store.set(key, value);
  }
}

export const storage = new Storage(new Store());
