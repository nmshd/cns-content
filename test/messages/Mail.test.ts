import { SerializableAsync } from "@js-soft/ts-serval"
import { Mail } from "@nmshd/content"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"

export class MailTest extends AbstractTest {
    public run(): void {
        describe("Mail", function () {
            it("should create a Mail from JSON", async function () {
                const mail = await SerializableAsync.fromUnknown({
                    "@type": "Mail",
                    to: ["id1PNvUP4jHD74qo6usnWNoaFGFf33MXZi6c"],
                    cc: [],
                    subject: "A Subject",
                    body: "A Body"
                })

                expect(mail).instanceOf(Mail)
            })

            it("should create a Mail from JSON if cc is missing", async function () {
                const mail = await SerializableAsync.fromUnknown({
                    "@type": "Mail",
                    to: ["id1PNvUP4jHD74qo6usnWNoaFGFf33MXZi6c"],
                    subject: "A Subject",
                    body: "A Body"
                })

                expect(mail).instanceOf(Mail)
            })

            it("should throw an Error if to is empty", async function () {
                let error: any
                await SerializableAsync.fromUnknown({
                    "@type": "Mail",
                    to: [],
                    cc: [],
                    subject: "A Subject",
                    body: "A Body"
                }).catch((e) => (error = e))

                expect(error).to.not.be.undefined
                expect(error.message).to.equal("Mail.to:Array :: may not be empty")
            })

            it("should throw an Error if to is missing", async function () {
                let error: any
                await SerializableAsync.fromUnknown({
                    "@type": "Mail",
                    cc: [],
                    subject: "A Subject",
                    body: "A Body"
                }).catch((e) => (error = e))

                expect(error).to.not.be.undefined
                expect(error.message).to.equal("Mail.to :: Value is not defined")
            })
        })
    }
}
