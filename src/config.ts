import { ConfigProvider } from "tabby-core";

/** @hidden */
export class SaveOutputConfigProvider extends ConfigProvider {
  defaults = {
    saveToFile: {
      autoSaveDirectory: null,
    },
  };

  platformDefaults = {};
}
