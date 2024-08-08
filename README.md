# Adventure JavaScript Utilities

## Installation

```sh
npm i @adventure/js-utilities
```

## Anwendung

```js
import * as adventure from '@adventure/js-utilities';
```

## Beispiel

```js
this.breakpointProvider = new adventure.BreakpointProvider();

window.matchMedia(`(min-width: ${this.breakpointProvider.breakpoints.large})`).addListener(() => {
    // Listener wird ausgeführt, wenn der Viewport auf "large" vergrößert wird
});

if (window.matchMedia(`(max-width: ${this.breakpointProvider.breakpoints.medium})`).matches) {
    // Bedingung ist erfüllt, wenn der Viewport maximal so breit ist wie "medium"
}
```

## API-Dokumentation

Nähere Details zu den Klassen und Funktionen findest du auf [adventure.docs.lan/js-utilities/](http://adventure.docs.lan/js-utilities/).