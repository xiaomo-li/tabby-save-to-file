import { Injectable } from "@angular/core";
import { SettingsTabProvider } from "tabby-settings";

import { SaveOutputSettingsTabComponent } from "./settingsTab.component";

/** @hidden */
@Injectable()
export class SaveOutputSettingsTabProvider extends SettingsTabProvider {
  id = "save-output";
  icon = "download";
  title = "Save to File";

  getComponentType(): any {
    return SaveOutputSettingsTabComponent;
  }
}
