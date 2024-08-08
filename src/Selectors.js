/**
 * DOM-Zugriffe, die nicht mit CSS möglich sind
 *
 * @example
 * document.querySelector('button').addEventListener('click', (event) => {
 *     const siblings = adventure.Selectors.siblings(event.target);
 * });
 */
export class Selectors {
    /**
     *
     * @param {HTMLElement} element
     * @returns {Array}
     */
    static siblings(element) {
        return [...element.parentElement.children].filter((siblings) => {
            return siblings !== element;
        });
    }
}