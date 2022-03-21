import { SerializableAsync } from "@js-soft/ts-serval"
import {
    Attribute,
    AttributesChangeRequest,
    AttributesShareRequest, Mail,
    RequestMail
} from "@nmshd/content"
import { CoreAddress, CoreId } from "@nmshd/transport"
import { expect } from "chai"
import { AbstractTest } from "../AbstractTest"

export class RequestMailTest extends AbstractTest {
    public run(): void {
        describe("RequestMail", function () {
            const from = CoreAddress.from("id1PNvUP4jHD74qo6usnWNoaFGFf33MXZi6c")
            const to = CoreAddress.from("id1KmcVtEwJhfRoWMWVCMWJgs5ct3ygYZmSQ")

            this.timeout(150000)

            it("should create a correct object", async function () {
                const m = await Mail.from({
                    to: [to],
                    subject: "Some Request Mail",
                    body: "Please approve following requests"
                })
                expect(m).to.be.instanceOf(SerializableAsync)
                expect(m).to.be.instanceOf(Mail)
                const content = m.toJSON() as any
                const request = await AttributesShareRequest.from({
                    id: await CoreId.generate("REQ"),
                    attributes: ["Person.familyName", "Person.givenName"],
                    recipients: [from]
                })
                const changeAttributes = await AttributesChangeRequest.fromT(
                    {
                        id: "REQ9928830039",
                        attributes: [
                            Attribute.from({
                                name: "dc.languageAssessmentDe",
                                value: JSON.stringify({
                                    value: "B1",
                                    source: "g.a.s.t."
                                })
                            }),
                            Attribute.from({
                                name: "Person.givenName",
                                value: "someGivenName"
                            })
                        ]
                    },
                    AttributesChangeRequest
                )
                content.requests = [request.toJSON(), changeAttributes.toJSON()]

                const mail = await RequestMail.from({
                    to: [to],
                    subject: "Some Request Mail",
                    body: "Please approve following requests",
                    requests: [request, changeAttributes]
                })

                expect(mail).to.be.instanceOf(Mail)
                expect(mail).to.be.instanceOf(RequestMail)

                expect(mail.to).to.be.an("Array")
                expect(mail.to[0]).to.equal(to)
                expect(mail.subject).to.equal("Some Request Mail")
                expect(mail.body).to.equal("Please approve following requests")
                expect(mail.requests).to.be.an("Array")
                expect(mail.requests[0]).to.be.an("Object")
                expect(mail.requests[0]).to.be.instanceOf(AttributesShareRequest)

                expect(mail.requests[1]).to.be.an("Object")
                expect(mail.requests[1]).to.be.instanceOf(AttributesChangeRequest)

                const receivedRequest = mail.requests[0] as unknown as AttributesShareRequest
                expect(receivedRequest.attributes).to.be.an("Array")
                expect(receivedRequest.attributes[0]).to.equal("Person.familyName")
                expect(receivedRequest.attributes[1]).to.equal("Person.givenName")
                expect(receivedRequest.recipients).to.be.an("Array")
                expect(receivedRequest.recipients[0]).to.be.instanceOf(CoreAddress)
                expect(receivedRequest.recipients[0].address).to.equal(from.toString())

                const receivedRequest2 = mail.requests[1] as unknown as AttributesChangeRequest
                expect(receivedRequest2.attributes).to.be.an("Array")
                expect(receivedRequest2.attributes[0]).to.be.instanceOf(Attribute)
                expect(receivedRequest2.attributes[0].name).to.equal("dc.languageAssessmentDe")
                expect(receivedRequest2.attributes[0].value).to.equal(
                    JSON.stringify({
                        value: "B1",
                        source: "g.a.s.t."
                    })
                )
                expect(receivedRequest2.attributes[1]).to.be.instanceOf(Attribute)
                expect(receivedRequest2.attributes[1].name).to.equal("Person.givenName")
                expect(receivedRequest2.attributes[1].value).to.equal("someGivenName")

                const json = mail.toJSON() as any
                expect(json.to).to.be.an("Array")
                expect(json.to[0]).to.equal(to.toString())
                expect(json.subject).to.equal("Some Request Mail")
                expect(json.body).to.equal("Please approve following requests")
                expect(json.requests).to.be.an("Array")
                expect(json.requests[0]).to.be.an("Object")
                expect(json.requests[0].attributes).to.be.an("Array")
                expect(json.requests[0].attributes[0]).to.equal("Person.familyName")
                expect(json.requests[0].attributes[1]).to.equal("Person.givenName")
                expect(json.requests[0].recipients).to.be.an("Array")
                expect(json.requests[0].recipients[0]).to.equal(from.toString())

                const parsed = await SerializableAsync.fromUnknown(json)

                expect(parsed).to.be.instanceOf(Mail)
                expect(parsed).to.be.instanceOf(RequestMail)

                const parsedMail = parsed as unknown as RequestMail

                expect(parsedMail.to).to.be.an("Array")
                expect(parsedMail.to[0].toString()).to.equal(to.toString())
                expect(parsedMail.subject).to.equal("Some Request Mail")
                expect(parsedMail.body).to.equal("Please approve following requests")
                expect(parsedMail.requests).to.be.an("Array")
                expect(parsedMail.requests[0]).to.be.an("Object")
                expect(parsedMail.requests[0]).to.be.instanceOf(AttributesShareRequest)

                const parsedRequest = mail.requests[0] as unknown as AttributesShareRequest
                expect(parsedRequest.attributes).to.be.an("Array")
                expect(parsedRequest.attributes[0]).to.equal("Person.familyName")
                expect(parsedRequest.attributes[1]).to.equal("Person.givenName")
                expect(parsedRequest.recipients).to.be.an("Array")
                expect(parsedRequest.recipients[0]).to.be.instanceOf(CoreAddress)
                expect(parsedRequest.recipients[0].address).to.equal(from.toString())
            }).timeout(15000)
        })
    }
}
