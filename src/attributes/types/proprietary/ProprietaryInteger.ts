import { serialize, type, validate } from "@js-soft/ts-serval"
import { IValueHintsOverride, ValueHints, ValueHintsOverride } from "../../hints"
import { AbstractInteger, AbstractIntegerJSON, IAbstractInteger } from "../AbstractInteger"

export type ProprietaryIntegerJSON = AbstractIntegerJSON

export interface IProprietaryInteger extends IAbstractInteger {
    valueHintsOverride?: IValueHintsOverride
}

@type("ProprietaryInteger")
export class ProprietaryInteger extends AbstractInteger {
    public override get valueHints(): ValueHints {
        return (this.constructor as any).valueHints.with(this.valueHintsOverride?.toJSON())
    }

    @serialize()
    @validate({ nullable: true })
    public valueHintsOverride?: ValueHintsOverride

    public static override from(value: IProprietaryInteger): ProprietaryInteger {
        return this.fromAny(value)
    }
}
