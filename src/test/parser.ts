import { IframeOptions } from "./../parser"
import * as chai from "chai"
import chaiString = require("chai-string")
import { YouTubeURLParser } from "../index"

chai.use(chaiString)

describe("valid URL 1", () => {

    const parser = new YouTubeURLParser("https://youtu.be/7lmCu8wz8ro?t=1h20m30s")

    it("should return true", () => {
        const result = parser.isValid()
        return chai.expect(result).to.be.true
    })

    it("should return valid id", () => {
        const result = parser.getId()
        return chai.expect(result).to.equal("7lmCu8wz8ro")
    })

    it("should return valid canonical URL", () => {
        const result = parser.getCanonicalURL()
        return chai.expect(result).to.equal("https://www.youtube.com/watch?v=7lmCu8wz8ro&t=1h20m30s")
    })

    it("should return valid short URL", () => {
        const result = parser.getShortURL()
        return chai.expect(result).to.equal("https://youtu.be/7lmCu8wz8ro?t=1h20m30s")
    })

    it("should return valid thumbnail URL", () => {
        const result = parser.getThumbnailURL()
        return chai.expect(result).to.equal("https://img.youtube.com/vi/7lmCu8wz8ro/0.jpg")
    })

    it("should return 4830 (1 * 60 * 60 + 20 * 60 + 30)", () => {
        const result = parser.getStartAtSecound()
        return chai.expect(result).to.equal(4830)
    })
})

describe("iframe test", () => {

    const parser = new YouTubeURLParser("https://youtu.be/7lmCu8wz8ro?t=1h20m30s")

    it("should return default HTML", () => {
        const result = parser.getIframe()
        return chai.expect(result).to.equalIgnoreSpaces(`<div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" type="text/html"
              src="https://www.youtube.com/embed/7lmCu8wz8ro?rel=0&amp;start=4830"
              frameborder="0" allowfullscreen /></div>`)
    })

    const options: IframeOptions = {
        allowFullScreen: false,
        frameBorder: 1,
        noCookie: true,
    }
    it("should return customized HTML", () => {
        const result = parser.getIframe(options)
        return chai.expect(result).to.equalIgnoreSpaces(`<div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" type="text/html"
              src="https://www.youtube-nocookie.com/embed/7lmCu8wz8ro?rel=0&amp;start=4830"
              frameborder="1" /></div>`)
    })
})

describe("valid URL 2", () => {

    const parser = new YouTubeURLParser("https://www.youtube.com/watch?v=7lmCu8wz8ro&t=25s")

    it("should return fales", () => {
        const result = parser.isValid()
        return chai.expect(result).to.be.true
    })

    it("should return valid id", () => {
        const result = parser.getId()
        return chai.expect(result).to.equal("7lmCu8wz8ro")
    })

    it("should return 25", () => {
        const result = parser.getStartAtSecound()
        return chai.expect(result).to.equal(25)
    })
})

describe("invalid URL 1", () => {

    const parser = new YouTubeURLParser("https://invalid.youtube.com/e7lmCu8wz8ro&t=25s")

    it("should return true", () => {
        const result = parser.isValid()
        return chai.expect(result).to.be.false
    })

    it("should return null", () => {
        const result = parser.getId()
        return chai.expect(result).to.be.null
    })

    it("should return null", () => {
        const result = parser.getStartAtSecound()
        return chai.expect(result).to.be.null
    })
})

describe("invalid params 1", () => {

    const parser = new YouTubeURLParser("https://youtu.be/7lmCu8wz8ro?hoge=console.log(123)")

    it("should return true", () => {
        const result = parser.isValid()
        return chai.expect(result).to.be.true
    })

    it("should return valid id", () => {
        const result = parser.getShortURL()
        return chai.expect(result).to.equal("https://youtu.be/7lmCu8wz8ro?hoge=console.log%28123%29")
    })
})

describe("invalid params 2", () => {

    const parser = new YouTubeURLParser("https://youtu.be/watch?v=console.log(123)")

    it("should return true", () => {
        const result = parser.isValid()
        return chai.expect(result).to.be.false
    })

    it("should return valid id", () => {
        const result = parser.getId()
        return chai.expect(result).to.be.null
    })
})
