import { Observable, pipe, UnaryFunction } from "rxjs";
import { tap } from "rxjs/operators";

export function stopEvent(
  shouldDisable: boolean | undefined | null = true
): UnaryFunction<Observable<Event>, Observable<Event>> {
  return pipe(
    tap((event) => {
      if (shouldDisable) {
        event.stopPropagation();
        event.preventDefault();
      }
    })
  );
}
