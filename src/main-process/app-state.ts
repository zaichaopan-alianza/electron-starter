import { z } from "zod";
import { Storage } from "./fileStorage";

export class AppState {
  private language: string;
  private theme: string;
  private isQuitting = false;
  private isQuittingForUpdate = false;

  constructor(private storage: Storage) {
    this.language = this.storage.getItem("language", z.string(), "en");
    this.theme = this.storage.getItem("language", z.string(), "theme");
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

//