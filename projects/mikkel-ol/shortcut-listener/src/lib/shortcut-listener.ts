import { Subscription, debounceTime, fromEvent, merge, tap } from "rxjs";
import { filterShortcut } from "./utils/filter-shortcut.operator";
import { RecordKey } from "./utils/record-key";
import { stopEvent } from "./utils/stop-event.operator";

const eventTypes$ = [
  fromEvent<KeyboardEvent>(document, "keypress"),
  fromEvent<KeyboardEvent>(document, "keydown"),
];

export type Options = {
  bubbleEvent?: boolean;
  debounceTime?: number;
};

const defaultOptions = {
  bubbleEvent: false,
  debounceTime: 10,
} satisfies Options;

export function ShortcutListener(shortcut: RecordKey, opts: Options = {}) {
  const options = {
    ...defaultOptions,
    ...opts,
  } satisfies Options;

  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    let subscription: Subscription;

    const originalMethod = descriptor.value as Function | null;
    const originalOnInit = target.constructor.prototype.ngOnInit as Function | null;
    const originalOnDestroy = target.constructor.prototype.ngOnDestroy as Function | null;

    // add subscription on init
    target.constructor.prototype.ngOnInit = function () {
      subscription = merge(...eventTypes$)
        .pipe(
          filterShortcut(shortcut),
          stopEvent(options.bubbleEvent),
          debounceTime(options.debounceTime),
          tap((event) => originalMethod?.call(this, event))
        )
        .subscribe();

      originalOnInit?.apply(this);
    };

    // remove subscription on destroy
    target.constructor.prototype.ngOnDestroy = function () {
      subscription.unsubscribe();

      originalOnDestroy?.apply(this);
    };

    return descriptor;
  };
}
