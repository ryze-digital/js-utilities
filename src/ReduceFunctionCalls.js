/**
 * Reduziert Funktionsaufrufe
 * @example
 * window.addEventListener('resize', adventure.ReduceFunctionCalls.throttle(() => {...}));
 */
export class ReduceFunctionCalls {
    /**
     * @param {Function} callback
     * @param {number} delay
     * @param {object} scope
     * @param {Array} args
     * @returns {Function}
     * @see https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
     */
    static throttle(callback, delay = 250, scope = this, ...args) {
        let timeout;
        let lastRan;

        return () => {
            if (!lastRan) {
                callback.apply(scope, args);
                lastRan = Date.now();
            } else {
                clearTimeout(timeout);

                timeout = setTimeout(() => {
                    if ((Date.now() - lastRan) >= delay) {
                        callback.apply(scope, args);
                        lastRan = Date.now();
                    }
                }, delay - (Date.now() - lastRan));
            }
        };
    }

    /**
     * @param {Function} callback
     * @param {number} delay
     * @param {object} scope
     * @param {Array} args
     * @returns {Function}
     * @see https://davidwalsh.name/javascript-debounce-function
     */
    static debounce(callback, delay = 250, scope = this, ...args) {
        let timeout;

        return () => {
            const debouncedCallback = () => {
                timeout = null;

                callback.apply(scope, args);
            };

            clearTimeout(timeout);

            timeout = setTimeout(debouncedCallback, delay);
        };
    }
}