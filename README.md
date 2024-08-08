# RYZE Digital JavaScript Utilities

## Install

```sh
npm i @ryze-digital/js-utilities
```

## Usage

```js
import * as utils from '@ryze-digital/js-utilities';
```

## Example

```js
this.breakpointProvider = new utils.BreakpointProvider();

window.matchMedia(`(min-width: ${this.breakpointProvider.breakpoints.large})`).addListener(() => {
    // Code gets executed when the viewport is at least "large"
});

if (window.matchMedia(`(max-width: ${this.breakpointProvider.breakpoints.medium})`).matches) {
    // Condition evaluates to true, if the viewport is at most "medium"
}
```