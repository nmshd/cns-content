import { ISerializableAsync, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, ICoreAddress } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"

export interface MailJSON extends ContentJSON {
    to: string[]
    cc?: string[]
    subject: string
    body: string
}
export interface IMail extends ISerializableAsync {
    to: ICoreAddress[]
    cc?: ICoreAddress[]
    subject: string
    body: string
}

@type("Mail")
export class Mail extends SerializableAsync implements IMail {
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

    public static async from(value: IMail): Promise<Mail> {
        if (typeof value.cc === "undefined") {
            value.cc = []
        }
        if (typeof value.body === "undefined" && (value as any).content) {
            value.body = (value as any).content
            delete (value as any).content
        }

        return await super.fromT(value, Mail)
    }

    public static async fromJSON(value: MailJSON): Promise<Mail> {
        return await this.from({
            body: value.body,
            subject: value.subject,
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            to: value.to?.map((recipient) => CoreAddress.from(recipient)),
            cc: value.cc?.map((recipient) => CoreAddress.from(recipient))
        })
    }
}
