import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreSerializable, ICoreDate, ICoreSerializable } from "@nmshd/transport"
import { nameof } from "ts-simple-nameof"
import { ContentJSON } from "../ContentJSON"

export interface AttributeJSON extends ContentJSON {
    content: unknown
    createdAt: string
    tags?: string[]
    validFrom?: string
    validTo?: string
}

export interface IAttribute extends ICoreSerializable {
    content: unknown
    createdAt: ICoreDate
    tags?: string[] | undefined
    validFrom?: ICoreDate
    validTo?: ICoreDate
}

@type("Attribute")
export class Attribute extends CoreSerializable implements IAttribute {
    public readonly technicalProperties = ["@type", "@context", nameof<Attribute>((r) => r.createdAt)]

    public readonly userdataProperties = [
        nameof<Attribute>((r) => r.content),
        nameof<Attribute>((r) => r.validFrom),
        nameof<Attribute>((r) => r.validTo),
        nameof<Attribute>((r) => r.tags)
    ]

    @validate()
    @serialize()
    public content: unknown

    @validate()
    @serialize()
    public createdAt: CoreDate

    @serialize({ type: String })
    @validate({ nullable: true })
    public tags?: string[]

    @serialize()
    @validate({ nullable: true })
    public validFrom?: CoreDate

    @serialize()
    @validate({ nullable: true })
    public validTo?: CoreDate

    public static from(value: IAttribute): Attribute {
        value.content = CoreSerializable.fromUnknown(value.content)
        return super.from(value, Attribute) as Attribute
    }

    public static fromJSON(attribute: AttributeJSON): Attribute {
        return this.from({
            content: attribute.content,
            createdAt: CoreDate.utc(),
            tags: attribute.tags,
            validFrom: attribute.validFrom ? CoreDate.from(attribute.validFrom) : undefined,
            validTo: attribute.validTo ? CoreDate.from(attribute.validTo) : undefined
        })
    }
}
