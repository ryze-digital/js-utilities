export class Tracker {
    /**
     * @type {object}
     */
    #trackingProviderMapping = {
        'matomo': '_paq',
        'googleAnalytics': 'gtag'
    };

    /**
     * @type {Array}
     */
    #trackingProvider = [];

    constructor() {
        this.#setTrackingProvider();

        if (this.#trackingProvider.length === 0) {
            console.warn('No tracking provider detected');
        }
    }

    /**
     * @param {string} category
     * @param {string} action
     * @param {string} name
     * @param {number} value
     */
    track(category, action, name, value) {
        this.#trackingProvider.forEach((trackingProvider) => {
            switch (trackingProvider) {
                case 'matomo':
                    window[this.#trackingProviderMapping[trackingProvider]].push(['trackEvent', category, action, name, value]);
                    break;
                case 'googleAnalytics':
                    window[this.#trackingProviderMapping[trackingProvider]]('event', action, {
                        event_category: category,
                        event_label: name,
                        value: value
                    });
                    break;
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