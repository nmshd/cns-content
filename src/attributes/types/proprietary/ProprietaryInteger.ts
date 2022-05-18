import { serialize, type, validate } from "@js-soft/ts-serval"
import { IValueHintsOverride, RenderHints, RenderHintsOverride, ValueHints, ValueHintsOverride } from "../../hints"
import { AbstractInteger, AbstractIntegerJSON, IAbstractInteger } from "../AbstractInteger"

export type ProprietaryIntegerJSON = AbstractIntegerJSON

export interface IProprietaryInteger extends IAbstractInteger {
    valueHintsOverride?: IValueHintsOverride
}

@type("ProprietaryInteger")
export class ProprietaryInteger extends AbstractInteger {
    public override get valueHints(): ValueHints {
        return ((this.constructor as any).valueHints as ValueHints).copyWith(this.valueHintsOverride?.toJSON())
    }

    public override get renderHints(): RenderHints {
        return ((this.constructor as any).renderHints as RenderHints).copyWith(this.renderHintsOverride?.toJSON())
    }

    @serialize()
    @validate({ nullable: true })
    public valueHintsOverride?: ValueHintsOverride

    @serialize()
    @validate({ nullable: true })
    public renderHintsOverride?: RenderHintsOverride

    public static override from(value: IProprietaryInteger): ProprietaryInteger {
        return this.fromAny(value)
    }
}
