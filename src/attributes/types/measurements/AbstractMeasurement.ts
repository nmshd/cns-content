import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractComplexValue, AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"

export interface AbstractMeasurementJSON extends AbstractComplexValueJSON {
    unit: string
    value: number
}

export interface IMeasurement extends IAbstractComplexValue {
    unit: string
    value: number
}

/**
 * valid unit strings must be defined in the classes extending AbstractMeasurement as enum
 */
export abstract class AbstractMeasurement extends AbstractComplexValue implements IMeasurement {
    @serialize()
    @validate()
    public unit: string

    @serialize()
    @validate()
    public value: number

    public override toString(): string {
        return `${this.value} ${this.unit}`
    }
}
