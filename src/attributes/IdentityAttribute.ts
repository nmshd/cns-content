import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute, AbstractAttributeJSON, IAbstractAttribute } from "./AbstractAttribute"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "./AbstractAttributeValue"

export interface IdentityAttributeJSON<K extends AbstractAttributeValueJSON = AbstractAttributeValueJSON>
    extends AbstractAttributeJSON {
    store: "Identity"
    value: K
    tags?: string[]
}

export interface IIdentityAttribute<T extends IAbstractAttributeValue = IAbstractAttributeValue>
    extends IAbstractAttribute {
    value: T
    tags?: string[]
}

@type("IdentityAttribute")
export class IdentityAttribute<T extends AbstractAttributeValue = AbstractAttributeValue>
    extends AbstractAttribute
    implements IIdentityAttribute<T>
{
    @serialize()
    @validate()
    public readonly store: "Identity" = "Identity"

    // Fix serval bug where { type: AbstractAttributeValue } does not work here ...
    @serialize({ unionTypes: [AbstractAttributeValue] })
    @validate()
    public value: T

    @serialize({ type: String })
    @validate({ nullable: true })
    public tags?: string[]

    protected static override preFrom(value: any): any {
        if (!value.store) value.store = "Identity"
        return value
    }

    public static from<
        T extends AbstractAttributeValue = AbstractAttributeValue,
        I extends IAbstractAttributeValue = IAbstractAttributeValue,
        K extends AbstractAttributeValueJSON = AbstractAttributeValueJSON
    >(value: IIdentityAttribute<I> | IdentityAttributeJSON<K>): IdentityAttribute<T> {
        return this.fromAny(value) as IdentityAttribute<T>
    }
}
