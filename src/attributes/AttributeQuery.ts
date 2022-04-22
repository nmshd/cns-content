import { serialize, type, validate } from "@js-soft/ts-serval"
import { CoreSerializable, ICoreSerializable } from "@nmshd/transport"

export interface IAttributeQuery extends ICoreSerializable {
    attributeType?: string
    onlyValid: boolean
    tags?: string[]
}

@type("AttributeQuery")
export class AttributeQuery extends CoreSerializable implements IAttributeQuery {
    @serialize()
    @validate()
    public onlyValid: boolean

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
        return this.fromAny(value)
    }
}
