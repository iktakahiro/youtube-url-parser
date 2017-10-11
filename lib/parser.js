"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs_1 = require("qs");
var validHost = /^(www.youtube.com|youtu.be)$/;
var validPathname = /^.*\/([a-zA-Z0-9_-]{11})$/;
var validId = /^([a-zA-Z0-9_-]{11})$/;
var validStartAt = /^((\d{1,2})h)?((\d{1,2})m)?((\d{1,2})s)?$/;
var YouTubeURLParser = (function () {
    function YouTubeURLParser(url, options) {
        if (options === void 0) { options = {
            iframe: {
                allowFullScreen: true,
                frameBorder: 0,
                responsive: true,
                noCookie: false,
                width: 560,
                height: 315,
            },
        }; }
        this.url = url;
        this.options = options;
        var parser = document.createElement("a");
        parser.href = url;
        this.parsedURL = parser;
        if (options["iframe"]) {
            this.options.iframe = {
                allowFullScreen: options.iframe["allowFullScreen"] || true,
                frameBorder: options.iframe["frameBorder"] || 0,
                responsive: options.iframe["responsive"] || true,
                noCookie: options.iframe["noCookie"] || false,
            };
        }
        var query = qs_1.parse(this.parsedURL.search, { ignoreQueryPrefix: true });
        this.id = (validPathname.exec(this.parsedURL.pathname) || [])[1] || null;
        if (this.id === null) {
            this.id = (validId.exec(query["v"]) || [])[1] || null;
        }
        delete query["watch"];
        this.search = qs_1.stringify(query, { addQueryPrefix: false });
        var startAt = (validStartAt.exec(query["t"]) || []) || null;
        if (startAt) {
            this._startAt = {
                hour: Number(startAt[2]) || 0,
                minute: Number(startAt[4]) || 0,
                second: Number(startAt[6]) || 0,
            };
        }
    }
    /**
     * Checks whether URL is valid or invalid.
     */
    YouTubeURLParser.prototype.isValid = function () {
        if (!validHost.test(this.parsedURL.hostname)) {
            return false;
        }
        if (this.id === null) {
            return false;
        }
        return true;
    };
    /**
     * Returns the id of a YouTube video.
     * @return {string | null} id
     */
    YouTubeURLParser.prototype.getId = function () {
        if (!this.isValid()) {
            return null;
        }
        return this.id;
    };
    /**
     * Return the canonical URL of a YouTube video.
     * @return {string | null} URL
     */
    YouTubeURLParser.prototype.getCanonicalURL = function () {
        if (!this.isValid()) {
            return null;
        }
        return "https://www.youtube.com/watch?v=" + this.id + "&" + this.search;
    };
    /**
     * Return the embedding URL of a YouTube video.
     * @return {string | null} URL
     */
    YouTubeURLParser.prototype.getEmbeddingURL = function () {
        if (!this.isValid()) {
            return null;
        }
        return "https://www.youtube.com/embed/" + this.id + "?" + this.search;
    };
    /**
     * Return the short URL of a YouTube video.
     * @return {string | null} URL
     */
    YouTubeURLParser.prototype.getShortURL = function () {
        if (!this.isValid()) {
            return null;
        }
        return "https://youtu.be/" + this.id + "?" + this.search;
    };
    /**
     * Return the start time (second) of a YouTube video.
     * @return {number} second
     */
    YouTubeURLParser.prototype.getStartAtSecound = function () {
        if (!this.isValid()) {
            return null;
        }
        return this._startAt.hour * 60 * 60 + this._startAt.minute * 60 + this._startAt.second;
    };
    /**
     * Return the thumbnail URL of a YouTube video.
     * @return {string | null} ULR
     */
    YouTubeURLParser.prototype.getThumbnailURL = function () {
        if (!this.isValid()) {
            return null;
        }
        return "https://img.youtube.com/vi/" + this.id + "/0.jpg";
    };
    /**
     * Return the HTML string for embedding.
     * @return {string | null} HTML string
     */
    YouTubeURLParser.prototype.getIframe = function () {
        if (!this.isValid()) {
            return null;
        }
        var options = this.options.iframe;
        var domain = options.noCookie ? "www.youtube-nocookie.com" : "www.youtube.com";
        return "<div class=\"embed-responsive embed-responsive-16by9\">\n        <iframe class=\"embed-responsive-item\" type=\"text/html\"\n        src=\"https://" + domain + "/embed/" + this.id + "?rel=0&amp;start=" + (this.getStartAtSecound() || 0) + "\"\n        frameborder=\"" + options.frameBorder + "\" " + (options.allowFullScreen && "allowfullscreen") + " />\n        </div>";
    };
    return YouTubeURLParser;
}());
exports.YouTubeURLParser = YouTubeURLParser;
