/**
 * Verifiziert ein Fonts.net Projekt asynchron
 * @example
 * new adventure.FontVerification('your fonts.net project ID');
 */
export class FontVerification {
    /**
     * @param {string} projectId
     * @param {string} baseUrl
     */
    constructor(projectId, baseUrl = 'fast.fonts.net/t/1.css?apiType=css&projectid=') {
        this._projectId = projectId;
        this._baseUrl = baseUrl;

        if (document.readyState !== 'loading') {
            this._createVerificationTag();

            return;
        }

        document.addEventListener('DOMContentLoaded', this._createVerificationTag);
    }

    /**
     *  @private
     */
    _createVerificationTag() {
        const linkTag = document.createElement('link');
        const url = `https://${this._baseUrl}${this._projectId}`;

        linkTag.rel = 'stylesheet';
        linkTag.media = 'all';
        linkTag.href = url;

        document.body.appendChild(linkTag);
    }
}