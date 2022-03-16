import { SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { IRequest, Request, RequestJSON } from "../requests/v1/Request"
import { IMail, Mail, MailJSON } from "./Mail"

export interface RequestMailJSON extends MailJSON {
    requests: RequestJSON[]
}

export interface IRequestMail extends IMail {
    requests: IRequest[]
}

@type("RequestMail")
export class RequestMail extends Mail {
    @serialize()
    @validate()
    public requests: Request[]

    public static async from(value: IRequestMail): Promise<RequestMail> {
        return await super.fromT(value, RequestMail)
    }

    public static async fromJSON(value: RequestMailJSON): Promise<RequestMail> {
        const mail: Mail = await Mail.fromJSON(value)
        const requests: Request[] = (await Promise.all(
            value.requests.map((request) => SerializableAsync.fromUnknown(request))
        )) as Request[]

        return await this.from({
            body: mail.body,
            subject: mail.subject,
            to: mail.to,
            cc: mail.cc,
            requests: requests
        })
    }
}
