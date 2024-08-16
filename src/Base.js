/**
 * Basis-Klasse zur einheitlichen Verwendung von Events und Optionen.
 * Jede Adventure-Komponente leitet von dieser Basis-Klasse ab.
 * @example
 * export class Example extends adventure.Base {
 *     constructor () {
 *          const element = document.querySelector('.example');
 *
 *          this.on(element, 'click', (event) => {...});
 *     }
 * }
 */
export class Base {
    /**
     * @param {object} defaultOptions
     * @param {object} options
     */
    constructor(defaultOptions, options) {
        this._defaultOptions = defaultOptions;
        this._options = options;
        this._eventListeners = new Map();
    }

    /**
     * @returns {object}
     */
    get options() {
        return {
            ...this._defaultOptions,
            ...this._options
        };
    }

    /**
     * @private
     * @param {object} selector
     * @returns {boolean}
     */
    _isNodeList(selector) {
        // eslint-disable-next-line
        return NodeList.prototype.isPrototypeOf(selector);
    }

    /**
     * @private
     * @param {Node} element
     * @param {string} eventName
     * @param {Function} callback
     */
    _attachEvent(element, eventName, callback) {
        if (this._eventListeners.has(element)) {
            this._eventListeners.get(element).push({
                [eventName]: callback
            });
        } else {
            this._eventListeners.set(element, [{
                [eventName]: callback
            }]);
        }
        element.addEventListener(eventName, callback);
    }

    /**
     * @private
     * @param {Node} element
     * @param {string} eventName
     * @param {Function} callback
     * @param {number} eventIndex - Es können gleichzeitig mehrere Listener für den gleichen eventName registriert sein.
     */
    _detachEvent(element, eventName, callback, eventIndex) {
        element.removeEventListener(eventName, callback);
        this._eventListeners.get(element).splice(eventIndex, 1);
    }

    /**
     * @private
     * @param {Node} element
     * @param {string} eventName
     */
    _detachEvents(element, eventName) {
        const allListenersForElement = this._eventListeners.get(element);

        allListenersForElement.forEach((listener, index) => {
            if (eventName === '') {
                this._detachEvent(element, Object.keys(listener)[0], Object.values(listener)[0], index);
            } else {
                const callback = listener[eventName];

                if (typeof callback === 'function') {
                    this._detachEvent(element, eventName, callback, index);
                }
            }
        });

        if (this._eventListeners.get(element).length === 0) {
            this._eventListeners.delete(element);
        }
    }

    /**
     * @param {string} name
     * @param {object} [data]
     * @param {Element} el
     */
    emitEvent(name = '', data = {}, el = this.options.el) {
        const event = new CustomEvent(name, {
            detail: data
        });

        el.dispatchEvent(event);
    }

    /**
     * Fügt einem oder mehreren Elementen ein Event hinzu.
     * @param {Node|NodeList} selector
     * @param {string} eventName
     * @param {Function} callback
     */
    on(selector, eventName, callback) {
        // Todo: ermögliche Übergabe von Options (wie passive: true) für addEventlistener

        if (this._isNodeList(selector)) {
            selector.forEach((element) => {
                this._attachEvent(element, eventName, callback);
            });
        } else {
            this._attachEvent(selector, eventName, callback);
        }
    }

    /**
     * Entfernt einem Element oder mehreren Elementen das übergebene Event.
     * @param {Node|NodeList} selector
     * @param {string} [eventName] - Kann ausgelassen werden, um alle Events zu entfernen.
     */
    off(selector, eventName = '') {
        if (this._isNodeList(selector)) {
            selector.forEach((element) => {
                this._detachEvents(element, eventName);
            });
        } else {
            this._detachEvents(selector, eventName);
        }
    }

    /**
     * Entfernt alle registrierten Events.
     */
    offAll() {
        this._eventListeners.forEach((allListenersForElement, element) => {
            this._detachEvents(element, '');
        });
    }
}