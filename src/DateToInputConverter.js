/**
 * Konvertiert ein Date-Objekt zur Verwendung mit input[type="date"] und input[type="time"]
 * @example
 * const dateToInputConverter = new adventure.DateToInputConverter();
 *
 * document.querySelector('input[type="date"]').value = dateToInputConverter.date;
 */
export class DateToInputConverter {
    constructor() {
         
        this.dateObj = new Date(...arguments);
    }

    /**
     * @private
     * @param {number} number
     * @returns {string}
     */
    _prependLeadingZero(number) {
        let numberAsString = number.toString();

        if (number < 10) {
            numberAsString = `0${number}`;
        }

        return numberAsString;
    }

    /**
     * @returns {string}
     */
    get date() {
        return this.dateObj.toISOString().substr(0, 10);
    }

    /**
     * @returns {string}
     */
    get hours() {
        const hours = this.dateObj.getHours();

        return this._prependLeadingZero(hours);
    }

    /**
     * @returns {string}
     */
    get minutes() {
        const minutes = this.dateObj.getMinutes();

        return this._prependLeadingZero(minutes);
    }

    /**
     * @returns {string}
     */
    get time() {
        return `${this.hours}:${this.minutes}`;
    }
}