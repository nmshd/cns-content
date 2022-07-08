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
        return super.valueHints.copyWith(this.valueHintsOverride?.toJSON())
    }

    public override get renderHints(): RenderHints {
        return super.renderHints.copyWith(this.renderHintsOverride?.toJSON())
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
