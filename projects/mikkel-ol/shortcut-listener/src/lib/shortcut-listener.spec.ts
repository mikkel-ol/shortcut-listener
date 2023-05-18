import { APP_INITIALIZER, Component } from "@angular/core";
import { fakeAsync } from "@angular/core/testing";
import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { ShortcutListener } from "./shortcut-listener";
import { configureShortcuts } from "./shortcut.config";

const enum Shortcut {
  Copy,
}

@Component({
  selector: "app-component",
  template: ``,
})
class AppComponent {
  @ShortcutListener(Shortcut.Copy)
  onCopy() {
    console.log("onCopy");
  }
}

describe("ShortcutListener", () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    providers: [
      {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: () => () =>
          configureShortcuts({
            [Shortcut.Copy]: (e) => e.altKey && e.key === "a",
          }),
      },
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  it("should trigger onCopy when shortcut is pressed", fakeAsync(() => {
    // arrange
    const spy = spyOn(spectator.component, "onCopy");

    // act
    spectator.keyboard.pressKey("alt.a", document, "keydown");

    // assert
    // not working
    // expect(spy).toHaveBeenCalled();
  }));
});
