import * as fs from "fs";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MenuItemOptions } from "tabby-core";
import { ElectronService, ElectronHostWindow } from "tabby-electron";
import {
  BaseTerminalTabComponent,
  TerminalContextMenuItemProvider,
} from "tabby-terminal";

import "./styles.scss";

@Injectable()
export class SaveOutputContextMenu extends TerminalContextMenuItemProvider {
  weight = 1;

  constructor(
    private toastr: ToastrService,
    private electron: ElectronService,
    private hostWindow: ElectronHostWindow
  ) {
    super();
  }

  async getItems(
    tab: BaseTerminalTabComponent<any>
  ): Promise<MenuItemOptions[]> {
    return [
      {
        label: "save to file...",
        click: () => {
          setTimeout(() => {
            this.start(tab);
          });
        },
      },
      {
        label: "clear terminal output",
        click: () => {
          setTimeout(() => {
            tab.frontend?.clear();
          });
        },
      },
    ];
  }

  start(tab: BaseTerminalTabComponent<any>) {
    let path = this.electron.dialog.showSaveDialogSync(
      this.hostWindow.getWindow(),
      { defaultPath: "terminal-log.txt" }
    );

    if (!path) {
      return;
    }

    let stream = fs.createWriteStream(path);
    tab.frontend.selectAll();
    let content = tab.frontend.getSelection();
    tab.frontend.clearSelection();
    stream.write(content, "utf8");
    stream.end();

    this.toastr.info("File saved");
  }
}
