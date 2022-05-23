import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "../AbstractAttributeValue"
import { RenderHints, RenderHintsEditType, RenderHintsTechnicalType, ValueHints } from "../hints"

export type AbstractIntegerJSON = IAbstractIntegerValue | number

export interface IAbstractIntegerValue extends AbstractAttributeValueJSON {
    value: number
}

export interface IAbstractInteger extends IAbstractAttributeValue {
    value: number
}

export class AbstractInteger extends AbstractAttributeValue implements IAbstractInteger {
    @serialize()
    @validate({ customValidator: (v) => (!Number.isInteger(v) ? "must be an integer" : undefined) })
    public value: number

    public static override preFrom(value: any): any {
        if (typeof value === "number") value = { value }
        return value
    }

    public override toString(): string {
        return `${this.value}`
    }

    public static get valueHints(): ValueHints {
        return ValueHints.from({})
    }

    public static get renderHints(): RenderHints {
        return RenderHints.from({
            editType: RenderHintsEditType.InputLike,
            technicalType: RenderHintsTechnicalType.Integer
        })
    }

    public static from(value: IAbstractInteger): AbstractInteger {
        return this.fromAny(value)
    }
}
