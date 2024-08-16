/**
 * Setzt Klasse während ein Element "sticky" ist
 * @see https://davidwalsh.name/detect-sticky
 * @example
 * const element = document.getElementById('id');
 *
 * new adventure.DetectSticky(element);
 */
export class DetectSticky {
    /**
     * @param {HTMLElement} el
     */
    constructor(el) {
        this._el = el;
        this._observer = this._getObserver();

        this._el.style.top = '-1px';

        this._observer.observe(this._el);
    }

    /**
     * @private
     * @returns {IntersectionObserver}
     */
    _getObserver() {
        return new IntersectionObserver(([{ target, intersectionRatio }]) => {
            target.classList.toggle('is-sticky', intersectionRatio < 1);
        }, {
            threshold: [1]
        });
    }

    /**
     * @returns {IntersectionObserver}
     */
    get observer() {
        return this._observer;
    }
}