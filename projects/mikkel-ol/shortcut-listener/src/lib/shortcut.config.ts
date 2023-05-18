import { RecordKey } from "./record-key";
import { Shortcuts } from "./shortcuts.type";

export type Config = {
  shortcuts: Shortcuts<RecordKey>;
};

export const config: Config = {
  shortcuts: {},
};

export const configureShortcuts = (shortcuts: Shortcuts<RecordKey>) => {
  config.shortcuts = { ...shortcuts };
};
