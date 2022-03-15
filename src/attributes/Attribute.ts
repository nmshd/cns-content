import { serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "@nmshd/content"
import { CoreDate, CoreSerializable, ICoreDate, ICoreSerializable } from "@nmshd/transport"
import { nameof } from "ts-simple-nameof"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "./AbstractAttributeValue"

export interface AttributeJSON extends ContentJSON {
    content: AbstractAttributeValueJSON
    createdAt: string
    tags?: string[]
    validFrom?: string
    validTo?: string
}

export interface IAttribute extends ICoreSerializable {
    content: IAbstractAttributeValue
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
    public content: AbstractAttributeValue

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
        return super.fromT<Attribute>(value, Attribute)
    }

    public static fromJSON(attribute: AttributeJSON): Attribute {
        return super.fromT<Attribute>(attribute, Attribute)
    }
}
