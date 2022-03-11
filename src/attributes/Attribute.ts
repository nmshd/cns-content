import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreSerializable, ICoreDate, ICoreSerializable } from "@nmshd/transport"
import { nameof } from "ts-simple-nameof"
import { ContentJSON } from "../ContentJSON"
import { AbstractAttributeJSON } from "./AbstractAttribute"

export interface AttributeJSON extends ContentJSON {
    content: AbstractAttributeJSON
    createdAt: string
    tags?: string[]
    attributeType: string
    validFrom?: string
    validTo?: string
    metadataModifiedAt?: string
}

export interface IAttribute extends ICoreSerializable {
    content: any
    createdAt: ICoreDate
    tags?: string[] | undefined
    attributeType: string
    validFrom?: ICoreDate
    validTo?: ICoreDate
    metadataModifiedAt?: ICoreDate
}

@type("Attribute")
export class Attribute extends CoreSerializable implements IAttribute {
    public readonly technicalProperties = [
        "@type",
        "@context",
        nameof<Attribute>((r) => r.createdAt),
        nameof<Attribute>((r) => r.attributeType)
    ]

    public readonly userdataProperties = [
        nameof<Attribute>((r) => r.content),
        nameof<Attribute>((r) => r.validFrom),
        nameof<Attribute>((r) => r.validTo),
        nameof<Attribute>((r) => r.tags)
    ]

    public readonly metadataProperties = [nameof<Attribute>((r) => r.metadataModifiedAt)]

    @validate()
    @serialize()
    public content: any

    @validate()
    @serialize()
    public createdAt: CoreDate

    @serialize({ type: String })
    @validate({ nullable: true })
    public tags?: string[]

    @serialize()
    @validate()
    public attributeType: string

    @serialize()
    @validate({ nullable: true })
    public validFrom?: CoreDate

    @serialize()
    @validate({ nullable: true })
    public validTo?: CoreDate

    @validate({ nullable: true })
    @serialize()
    public metadataModifiedAt?: CoreDate

    public static from(value: IAttribute): Attribute {
        return super.from(value, Attribute) as Attribute
    }

    public static fromJSON(attribute: AttributeJSON): Attribute {
        return this.from({
            content: attribute.content,
            createdAt: CoreDate.utc(),
            tags: attribute.tags,
            attributeType: attribute.attributeType,
            validFrom: attribute.validFrom ? CoreDate.from(attribute.validFrom) : undefined,
            validTo: attribute.validTo ? CoreDate.from(attribute.validTo) : undefined,
            metadataModifiedAt: CoreDate.utc()
        })
    }
}
