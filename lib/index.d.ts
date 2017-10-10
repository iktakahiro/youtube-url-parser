// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]

declare namespace YouTubeURLParser {
    export interface ParserOptions {
        iframe?: {
            allowFullScreen?: boolean
            frameBorder?: number
            responsive?: boolean
            noCookie?: boolean,
            width?: number,
            height?: number,
        }
    }

    export interface StartAt {
        hour: number
        minute: number
        second: number
    }
}

declare class YouTubeURLParser {
    constructor(url: string, options: YouTubeURLParser.ParserOptions)

    isValid(): boolean
    getId(): string | null
    getCanonicalURL(): string | null
    getEmbeddingURL(): string | null
    getShortURL(): string | null
    getStartAtSecound(): number
    getThumbnailURL(): string | null
    getIframe(): string | null
}

export = YouTubeURLParser
