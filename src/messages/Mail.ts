import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreAddress, ICoreAddress } from "@nmshd/transport"
import { ContentJSON } from "../ContentJSON"

export interface MailJSON extends ContentJSON {
    to: string[]
    cc?: string[]
    subject: string
    body: string
}
export interface IMail extends ISerializable {
    to: ICoreAddress[]
    cc?: ICoreAddress[]
    subject: string
    body: string
}

@type("Mail")
export class Mail extends Serializable implements IMail {
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

    protected static override preFrom(value: any): any {
        if (typeof value.cc === "undefined") {
            value.cc = []
        }

        if (typeof value.body === "undefined" && value.content) {
            value.body = value.content
            delete value.content
        }

        return value
    }

    public static from(value: IMail): Mail {
        return this.fromAny(value)
    }

    public static fromJSON(value: MailJSON): Mail {
        return this.from({
            body: value.body,
            subject: value.subject,
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            to: value.to?.map((recipient) => CoreAddress.from(recipient)),
            cc: value.cc?.map((recipient) => CoreAddress.from(recipient))
        })
    }
}
