import { SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import {
    AttributesChangeRequest,
    AttributesChangeRequestJSON,
    IAttributesChangeRequest
} from "../requests/AttributesChangeRequest"
import {
    AttributesShareRequest,
    AttributesShareRequestJSON,
    IAttributesShareRequest
} from "../requests/AttributesShareRequest"
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

    public static async from(value: IRequestMail): Promise<RequestMail> {
        return await super.fromT(value, RequestMail)
    }

    public static async fromJSON(value: RequestMailJSON): Promise<RequestMail> {
        const mail: Mail = await Mail.fromJSON(value)
        const requests = await Promise.all(
            value.requests.map((request) => {
                switch (request["@type"]) {
                    case "AttributesChangeRequest":
                        return SerializableAsync.fromT(request, AttributesChangeRequest)
                    case "AttributesShareRequest":
                        return SerializableAsync.fromT(request, AttributesShareRequest)
                    default:
                        throw new Error(`Unknown request type: ${request["@type"]}`)
                }
            })
        )

        return await this.from({
            body: mail.body,
            subject: mail.subject,
            to: mail.to,
            cc: mail.cc,
            requests: requests
        })
    }
}
