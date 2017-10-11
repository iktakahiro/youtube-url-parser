export interface ParserOptions {
    iframe?: {
        allowFullScreen?: boolean;
        frameBorder?: number;
        responsive?: boolean;
        noCookie?: boolean;
        width?: number;
        height?: number;
    };
}
export interface StartAt {
    hour: number;
    minute: number;
    second: number;
}
export declare class YouTubeURLParser {
    url: string;
    options: ParserOptions;
    protected parsedURL: any;
    protected id: string | null;
    protected _startAt: StartAt;
    protected search: string;
    constructor(url: string, options?: ParserOptions);
    /**
     * Checks whether URL is valid or invalid.
     */
    isValid(): boolean;
    /**
     * Returns the id of a YouTube video.
     * @return {string | null} id
     */
    getId(): string | null;
    /**
     * Return the canonical URL of a YouTube video.
     * @return {string | null} URL
     */
    getCanonicalURL(): string | null;
    /**
     * Return the embedding URL of a YouTube video.
     * @return {string | null} URL
     */
    getEmbeddingURL(): string | null;
    /**
     * Return the short URL of a YouTube video.
     * @return {string | null} URL
     */
    getShortURL(): string | null;
    /**
     * Return the start time (second) of a YouTube video.
     * @return {number} second
     */
    getStartAtSecound(): number | null;
    /**
     * Return the thumbnail URL of a YouTube video.
     * @return {string | null} ULR
     */
    getThumbnailURL(): string | null;
    /**
     * Return the HTML string for embedding.
     * @return {string | null} HTML string
     */
    getIframe(): string | null;
}
