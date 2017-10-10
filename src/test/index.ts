import { expect } from "chai"
import { YouTubeURLParser } from "../index"

describe("valid URL 1", () => {

    const parser = new YouTubeURLParser("https://youtu.be/7lmCu8wz8ro?t=1h20m30s")

    it("should return true", () => {
        const result = parser.isValid()
        expect(result).to.equal(true)
    })

    it("should return valid id", () => {
        const result = parser.getId()
        expect(result).to.equal("7lmCu8wz8ro")
    })

    it("should return valid canonical URL", () => {
        const result = parser.getCanonicalURL()
        expect(result).to.equal("https://www.youtube.com/watch?v=7lmCu8wz8ro&t=1h20m30s")
    })

    it("should return valid short URL", () => {
        const result = parser.getShortURL()
        expect(result).to.equal("https://youtu.be/7lmCu8wz8ro?t=1h20m30s")
    })

    it("should return valid thumbnail URL", () => {
        const result = parser.getThumbnailURL()
        expect(result).to.equal("https://img.youtube.com/vi/7lmCu8wz8ro/0.jpg")
    })

    it("should return 4830 (1 * 60 * 60 + 20 * 60 + 30)", () => {
        const result = parser.getStartAtSecound()
        expect(result).to.equal(4830)
    })

    /*
    it("should return HTML", () => {
        const result = parser.getIframe()
        expect(result).to.equal("<iframe>")
    })
    */
})

describe("valid URL 2", () => {

    const parser = new YouTubeURLParser("https://www.youtube.com/watch?v=7lmCu8wz8ro&t=25s")

    it("should return fales", () => {
        const result = parser.isValid()
        expect(result).to.equal(true)
    })

    it("should return valid id", () => {
        const result = parser.getId()
        expect(result).to.equal("7lmCu8wz8ro")
    })

    it("should return 25", () => {
        const result = parser.getStartAtSecound()
        expect(result).to.equal(25)
    })
})

describe("invalid URL 1", () => {

    const parser = new YouTubeURLParser("https://invalid.youtube.com/e7lmCu8wz8ro&t=25s")

    it("should return true", () => {
        const result = parser.isValid()
        expect(result).to.equal(false)
    })

    it("should return valid id", () => {
        const result = parser.getId()
        expect(result).to.equal(null)
    })

    it("should return 25", () => {
        const result = parser.getStartAtSecound()
        expect(result).to.equal(null)
    })
})
