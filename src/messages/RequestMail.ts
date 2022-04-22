import { serialize, type, validate } from "@js-soft/ts-serval"
import {
    AttributesChangeRequest,
    AttributesChangeRequestJSON,
    IAttributesChangeRequest
} from "../requests/old/AttributesChangeRequest"
import {
    AttributesShareRequest,
    AttributesShareRequestJSON,
    IAttributesShareRequest
} from "../requests/old/AttributesShareRequest"
import { IMail, Mail, MailJSON } from "./Mail"

export interface RequestMailJSON extends MailJSON {
    requests: (AttributesChangeRequestJSON | AttributesShareRequestJSON)[]
}

export interface IRequestMail extends IMail {
    requests: (IAttributesChangeRequest | IAttributesShareRequest)[]
}

@type("RequestMail")
export class RequestMail extends Mail {
    @serialize()
    @validate()
    public requests: (AttributesChangeRequest | AttributesShareRequest)[]

    public static from(value: IRequestMail): RequestMail {
        return this.fromAny(value)
    }

    public static fromJSON(value: RequestMailJSON): RequestMail {
        const mail: Mail = Mail.fromJSON(value)
        const requests = value.requests.map((request) => {
            switch (request["@type"]) {
                case "AttributesChangeRequest":
                    return AttributesChangeRequest.fromAny(request)
                case "AttributesShareRequest":
                    AttributesShareRequest.fromAny(request)
                default:
                    throw new Error(`Unknown request type: ${request["@type"]}`)
            }
        })

        return this.from({
            body: mail.body,
            subject: mail.subject,
            to: mail.to,
            cc: mail.cc,
            requests: requests
        })
    }
}
