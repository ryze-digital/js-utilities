export class Tracker {
    /**
     * @type {object}
     */
    #trackingProviderMapping = {
        'matomo': '_paq'
        // other provider can be integrated like this: 'googleAnalytics': 'gtag'
    };

    /**
     * @type {Array}
     */
    #trackingProvider = [];

    constructor() {
        this.#setTrackingProvider();
    }

    /**
     * @param {string} category
     * @param {string} action
     * @param {string} name
     * @param {number} value
     */
    track(category, action, name, value) {
        this.#trackingProvider.forEach((trackingProvider) => {
            if (trackingProvider === 'matomo') {
                window[this.#trackingProviderMapping[trackingProvider]].push(['trackEvent', category, action, name, value]);
            }
        });
    }

    #setTrackingProvider() {
        Object.keys(this.#trackingProviderMapping).forEach((trackingProvider) => {
            if (typeof window[this.#trackingProviderMapping[trackingProvider]] !== 'undefined') {
                this.#trackingProvider.push(trackingProvider);
            }
        });
    }
}