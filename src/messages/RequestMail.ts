import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, ICoreAddress } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"
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

export interface RequestMailJSON extends ContentJSON {
    to: string[]
    cc?: string[]
    subject: string
    body: string
    requests: (AttributesChangeRequestJSON | AttributesShareRequestJSON)[]
}

export interface IRequestMail extends ISerializable {
    to: ICoreAddress[]
    cc?: ICoreAddress[]
    subject: string
    body: string
    requests: (IAttributesChangeRequest | IAttributesShareRequest)[]
}

@type("RequestMail")
export class RequestMail extends Serializable implements IRequestMail {
    @serialize({ type: CoreAddress })
    @validate({ customValidator: (v) => (v.length < 1 ? "may not be empty" : undefined) })
    public to: CoreAddress[]

    @serialize({ type: CoreAddress })
    @validate({ nullable: true })
    public cc?: CoreAddress[]

    @serialize()
    @validate()
    public subject: string

    @serialize()
    @validate()
    public body: string

    @serialize({ unionTypes: [AttributesChangeRequest, AttributesShareRequest] })
    @validate()
    public requests: (AttributesChangeRequest | AttributesShareRequest)[]

    public static from(value: IRequestMail): RequestMail {
        return this.fromAny(value)
    }

    public static fromJSON(value: RequestMailJSON): RequestMail {
        const requests = value.requests.map((request) => {
            switch (request["@type"]) {
                case "AttributesChangeRequest":
                    return AttributesChangeRequest.fromAny(request)
                case "AttributesShareRequest":
                    return AttributesShareRequest.fromAny(request)
                default:
                    throw new Error(`Unknown request type: ${request["@type"]}`)
            }
        })

        return this.from({
            body: value.body,
            subject: value.subject,
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            to: value.to?.map((recipient) => CoreAddress.from(recipient)),
            cc: value.cc?.map((recipient) => CoreAddress.from(recipient)),
            requests: requests
        })
    }
}
