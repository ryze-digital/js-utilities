export class DeepMerge {
    /**
     * @param {*} value
     * @returns {boolean}
     */
    static _isPlainObject(value) {
        if (value === null || typeof value !== 'object') {
            return false;
        }

        const proto = Object.getPrototypeOf(value);

        return proto === Object.prototype || proto === null;
    }

    /**
     * @param {string} key
     * @returns {boolean}
     */
    static _isUnsafeKey(key) {
        return key === '__proto__' || key === 'constructor' || key === 'prototype';
    }

    /**
     * @param {*} value
     * @returns {*}
     */

    /**
     * @param {object} target
     * @param {string} key
     * @param {*} value
     * @param {boolean} deep
     */
    static _assign(target, key, value, deep) {
        if (this._isUnsafeKey(key)) {
            return;
        }

        if (deep) {
            const src = target[key];

            if (Array.isArray(value)) {
                const clone = Array.isArray(src) ? src : [];

                target[key] = this._mergeArray(clone, value, deep);

                return;
            }

            if (this._isPlainObject(value)) {
                const clone = this._isPlainObject(src) ? src : {};

                target[key] = this._mergeObject(clone, value, deep);

                return;
            }
        }

        target[key] = value;
    }

    /**
     * @param {Array} target
     * @param {Array} source
     * @param {boolean} deep
     * @returns {Array}
     */
    static _mergeArray(target, source, deep) {
        // If not deep, simple shallow concat copy
        if (!deep) {
            return [...target, ...source];
        }

        const result = target.slice();

        source.forEach((item, index) => {
            const existing = result[index];

            if (Array.isArray(item)) {
                const base = Array.isArray(existing) ? existing : [];

                result[index] = this._mergeArray(base, item, true);
            } else if (this._isPlainObject(item)) {
                const base = this._isPlainObject(existing) ? existing : {};

                result[index] = this._mergeObject(base, item, true);
            } else if (index >= result.length) {
                // For primitives or non-plain objects, push if index exceeds length, otherwise replace
                result.push(item);
            } else {
                result[index] = item;
            }
        });

        return result;
    }

    /**
     * @param {object} target
     * @param {object} source
     * @param {boolean} deep
     * @returns {object}
     */
    static _mergeObject(target, source, deep) {
        Object.keys(source).forEach((key) => {
            this._assign(target, key, source[key], deep);
        });

        return target;
    }

    /**
     * @param {...*} args
     * @returns {object}
     */
    static merge(...args) {
        let deep = true;
        let target;
        let sources;

        if (typeof args[0] === 'boolean') {
            [deep, target, ...sources] = args;
        } else {
            [target, ...sources] = args;
        }

        if (!this._isPlainObject(target) && !Array.isArray(target)) {
            // Create a plain object as default target when invalid
            target = {};
        }

        sources.forEach((source) => {
            if (source === null || source === undefined) {
                return;
            }

            if (Array.isArray(source)) {
                if (!Array.isArray(target)) {
                    // If target is not an array, convert it to empty array for array merging
                    target = [];
                }

                target = this._mergeArray(target, source, deep);

                return;
            }

            if (this._isPlainObject(source)) {
                if (Array.isArray(target)) {
                    // If target is array and source is object, convert target to object
                    target = {};
                }

                target = this._mergeObject(target, source, deep);

                return;
            }

            // Non-plain objects/functions: assign directly by creating a shallow copy property if possible
            // Since we don't have a key here, skip — merge handles only objects/arrays as sources
        });

        return target;
    }
}
