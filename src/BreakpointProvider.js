/**
 * Stellt in adventure-scss definierte Breakpoints im JavaScript zur Verfügung
 *
 * @example
 * const {breakpoints} = new adventure.BreakpointProvider();
 *
 * window.matchMedia(`(min-width: ${breakpoints.large})`).addListener(() => {...});
 */
export class BreakpointProvider {
    /**
     * @param {HTMLElement} el
     * @param {string} pseudoElement
     */
    constructor(el = document.querySelector('html'), pseudoElement = 'after') {
        this._el = el;
        this._pseudoElement = pseudoElement;
        this._breakpoints = this._getBreakpoints();
    }

    /**
     * @private
     * @returns {string}
     */
    _getContentValue() {
        return window.getComputedStyle(this._el, `::${this._pseudoElement}`).getPropertyValue('content').replace(/['"]/g, '');
    }

    /**
     * @private
     * @returns {object}
     */
    _getBreakpoints() {
        const breakpointsString = this._getContentValue();
        const breakpoints = {};

        breakpointsString.split(',').forEach((keyValuePair) => {
            const breakpoint = keyValuePair.split(':');

            breakpoints[breakpoint[0]] = breakpoint[1];
        });

        return breakpoints;
    }

    /**
     * @returns {object}
     */
    get breakpoints() {
        return this._breakpoints;
    }
}