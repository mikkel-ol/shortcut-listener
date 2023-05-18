# @mikkel-ol/shortcut-listener [![npm version](https://badge.fury.io/js/%40mikkel-ol%2Fshortcut-listener.svg)](https://badge.fury.io/js/%40mikkel-ol%2Fshortcut-listener)

> Shortcuts done easy!

Listen to shortcuts with decorators in Angular.

You get complete control over what defines a shortcut. It can be anything from an enum, a string or a number.

```
npm i @mikkel-ol/shortcut-listener
```

# Usage

Configure the shortcuts by using the `configureShortcuts()` function somewhere in your application. The recommended way is to use the token `APP_INITIALIZER` in your `AppModule`:

```ts
const enum Shortcut {
  SelectAll,
  Copy,
  Paste,
}

function initializeShortcuts() {
  // global configuration
  configureShortcuts({
    [Shortcut.SelectAll]:   (e) => e.altKey && e.key === "a",
    [Shortcut.Copy]:        (e) => e.altKey && e.key === "c",
    [Shortcut.Paste]:       (e) => e.altKey && e.key === "v",
  });
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => initializeShortcuts,
    },
  ],
})
export class AppModule {}
```

Then you can listen to shortcuts in your components:

```ts
export class MyComponent {
  constructor() {}

  @ShortcutListener(Shortcut.SelectAll)
  onSelectAll() {
    // handle select all
  }

  @ShortcutListener(Shortcut.Copy)
  onCopy() {
    // handle copy
  }

  @ShortcutListener(Shortcut.Paste)
  onPaste() {
    // handle paste
  }
}
```
