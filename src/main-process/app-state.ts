import * as v from "valibot";
import { storage, Storage } from "./file-storage";

export class AppState {
  private language: string;
  private theme: string;
  private isQuitting = false;
  private isQuittingForUpdate = false;

  constructor(private storage: Storage) {
    this.language = this.storage.getItem("language", v.string(), "en");
    this.theme = this.storage.getItem("language", v.string(), "theme");
  }

  getIsQuitting() {
    return this.isQuitting;
  }

  getIsQuittingForUpdate() {
    return this.isQuittingForUpdate;
  }

  setIsQuittingForUpdate(isQuittingForUpdate: boolean) {
    this.isQuittingForUpdate = isQuittingForUpdate;
  }

  setIsQuitting(isQuitting: boolean) {
    this.isQuitting = isQuitting;
  }

  getLanguage() {
    return this.language;
  }

  setLanguage(language: string) {
    this.language = language;
    this.storage.setItem("language", language);
  }

  getTheme() {
    return this.theme;
  }

  setTheme(theme: string) {
    this.theme = theme;
    this.storage.setItem("theme", theme);
  }
}

export const appState = new AppState(storage);
