import { Observable, pipe, UnaryFunction } from "rxjs";
import { filter } from "rxjs/operators";
import { RecordKey } from "./record-key";
import { config } from "./shortcut.config";

export function filterShortcut(
  shortcut: RecordKey
): UnaryFunction<Observable<KeyboardEvent>, Observable<KeyboardEvent>> {
  return pipe(filter((event) => config.shortcuts[shortcut]?.call(this, event)));
}
