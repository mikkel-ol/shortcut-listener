import { Shortcuts } from "./shortcuts.type";
import { RecordKey } from "./utils/record-key";

export type Config = {
  shortcuts: Shortcuts<RecordKey>;
};

export const config: Config = {
  shortcuts: {},
};

export const configureShortcuts = (shortcuts: Shortcuts<RecordKey>) => {
  config.shortcuts = { ...shortcuts };
};
