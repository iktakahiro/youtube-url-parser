import { StartAt, ParserOptions } from "./../lib/index.d"

import { URL } from "url"
import { stringify, parse } from "qs"

const validHost = /^(www.youtube.com|youtu.be)$/
const validPathname = /^.*\/([a-zA-Z0-9_-]{11})$/
const validStartAt = /^((\d{1,2})h)?((\d{1,2})m)?((\d{1,2})s)?$/

export class YouTubeURLParser {
    protected parsedURL: URL
    protected id: string | null
    protected _startAt: StartAt
    protected search: string

    constructor(
        public url: string,
        public options: ParserOptions = {
            iframe: {
                allowFullScreen: true,
                frameBorder: 0,
                responsive: true,
                noCookie: false,
                width: 560,
                height: 315,
            },
        }) {

        this.parsedURL = new URL(url)

        if (options["iframe"]) {
            this.options.iframe = {
                allowFullScreen: options.iframe!["allowFullScreen"] || true,
                frameBorder: options.iframe!["frameBorder"] || 0,
                responsive: options.iframe!["responsive"] || true,
                noCookie: options.iframe!["noCookie"] || false,
            }
        }

        const query = parse(this.parsedURL.search, { ignoreQueryPrefix: true })
        this.id = (validPathname.exec(this.parsedURL.pathname) || [])[1] || null
        if (this.id === null) {
            this.id = query["v"] || null
        }
        delete query["watch"]
        this.search = stringify(query, { addQueryPrefix: false })
        const startAt = (validStartAt.exec(query["t"]) || []) || null
        if (startAt) {
            this._startAt = {
                hour: Number(startAt[2]) || 0,
                minute: Number(startAt[4]) || 0,
                second: Number(startAt[6]) || 0,
            }
        }
    }

    /**
     * Checks whether URL is valid or invalid.
     */
    public isValid(): boolean {
        if (!validHost.test(this.parsedURL.hostname)) {
            return false
        }
        if (this.id === null) {
            return false
        }
        return true
    }

    /**
     * Returns the id of a YouTube video.
     * @return {string | null} id
     */
    public getId(): string | null {
        if (!this.isValid()) {
            return null
        }
        return this.id
    }

    /**
     * Return the canonical URL of a YouTube video.
     * @return {string | null} URL
     */
    public getCanonicalURL(): string | null {
        if (!this.isValid()) {
            return null
        }
        return `https://www.youtube.com/watch?v=${this.id}&${this.search}`
    }

    /**
     * Return the embedding URL of a YouTube video.
     * @return {string | null} URL
     */
    public getEmbeddingURL(): string | null {
        if (!this.isValid()) {
            return null
        }
        return `https://www.youtube.com/embed/${this.id}?${this.search}`
    }

    /**
     * Return the short URL of a YouTube video.
     * @return {string | null} URL
     */
    public getShortURL(): string | null {
        if (!this.isValid()) {
            return null
        }
        return `https://youtu.be/${this.id}?${this.search}`
    }

    /**
     * Return the start time (second) of a YouTube video.
     * @return {number} second
     */
    public getStartAtSecound(): number | null {
        if (!this.isValid()) {
            return null
        }
        return this._startAt.hour * 60 * 60 + this._startAt.minute * 60 + this._startAt.second
    }

    /**
     * Return the thumbnail URL of a YouTube video.
     * @return {string | null} ULR
     */
    public getThumbnailURL(): string | null {
        if (!this.isValid()) {
            return null
        }
        return `https://img.youtube.com/vi/${this.id}/0.jpg`
    }

    /**
     * Return the HTML string for embedding.
     * @return {string | null} HTML string
     */
    public getIframe(): string | null {
        if (!this.isValid()) {
            return null
        }

        const options = this.options.iframe
        const domain = options!.noCookie ? "www.youtube-nocookie.com" : "www.youtube.com"
        return `<div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" type="text/html"
        src="https://${domain}/embed/${this.id}?rel=0&amp;start=${this.getStartAtSecound() || 0}"
        frameborder="${options!.frameBorder}" ${options!.allowFullScreen && "allowfullscreen"} />
        </div>`
    }
}
