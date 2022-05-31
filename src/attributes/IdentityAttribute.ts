import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute, AbstractAttributeJSON, IAbstractAttribute } from "./AbstractAttribute"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "./AbstractAttributeValue"

export interface IdentityAttributeJSON<
    TValueJSONInterface extends AbstractAttributeValueJSON = AbstractAttributeValueJSON
> extends AbstractAttributeJSON {
    value: TValueJSONInterface
    tags?: string[]
}

export interface IIdentityAttribute<TValueInterface extends IAbstractAttributeValue = IAbstractAttributeValue>
    extends IAbstractAttribute {
    value: TValueInterface
    tags?: string[]
}

@type("IdentityAttribute")
export class IdentityAttribute<TValueClass extends AbstractAttributeValue = AbstractAttributeValue>
    extends AbstractAttribute
    implements IIdentityAttribute<TValueClass>
{
    // Fix serval bug where { type: AbstractAttributeValue } does not work here ...
    @serialize({ unionTypes: [AbstractAttributeValue] })
    @validate()
    public value: TValueClass

    @serialize({ type: String })
    @validate({ nullable: true })
    public tags?: string[]

    public static from<
        TValueClass extends AbstractAttributeValue = AbstractAttributeValue,
        TValueInterface extends IAbstractAttributeValue = IAbstractAttributeValue,
        TValueJSONInterface extends AbstractAttributeValueJSON = AbstractAttributeValueJSON
    >(
        value: IIdentityAttribute<TValueInterface> | IdentityAttributeJSON<TValueJSONInterface>
    ): IdentityAttribute<TValueClass> {
        return this.fromAny(value) as IdentityAttribute<TValueClass>
    }

    public override toJSON(): IdentityAttributeJSON {
        return super.toJSON() as IdentityAttributeJSON
    }
}
