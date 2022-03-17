import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreSerializable, ICoreSerializable } from "@nmshd/transport"
import { nameof } from "ts-simple-nameof"

export interface IAttributeQuery extends ICoreSerializable {
    attributeType?: string
    tags?: string[]
}

@type("AttributeQuery")
export class AttributeQuery extends CoreSerializable implements IAttributeQuery {
    public readonly technicalProperties = [
        nameof<AttributeQuery>((r) => r.attributeType),
        nameof<AttributeQuery>((r) => r.tags)
    ]

    @serialize()
    @validate({
        nullable: true,
        customValidator: (v) => (v === "" ? "must not be an empty string" : undefined)
    })
    public attributeType?: string

    @serialize({ type: String })
    @validate({ nullable: true })
    public tags?: string[]

    public static from(value: IAttributeQuery): AttributeQuery {
        return super.fromT<AttributeQuery>(value, AttributeQuery)
    }
}
