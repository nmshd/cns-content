import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute, AbstractAttributeJSON, IAbstractAttribute } from "./AbstractAttribute"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "./AbstractAttributeValue"

export interface IdentityAttributeJSON extends AbstractAttributeJSON {
    store: "Identity"
    value: AbstractAttributeValueJSON
    tags?: string[]
}

export interface IIdentityAttribute extends IAbstractAttribute {
    store: "Identity"
    value: IAbstractAttributeValue
    tags?: string[]
}

@type("IdentityAttribute")
export class IdentityAttribute<T extends AbstractAttributeValue>
    extends AbstractAttribute
    implements IIdentityAttribute
{
    @serialize()
    @validate()
    public readonly store: "Identity" = "Identity"

    @serialize()
    @validate()
    public value: T

    @serialize({ type: String })
    @validate({ nullable: true })
    public tags?: string[]

    public static from<T extends AbstractAttributeValue>(
        value: IIdentityAttribute | IdentityAttributeJSON
    ): IdentityAttribute<T> {
        return this.fromAny(value) as IdentityAttribute<T>
    }
}
