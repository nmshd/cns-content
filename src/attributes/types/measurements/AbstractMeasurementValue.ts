import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractComplexValue, AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"

export interface AbstractMeasurementValueJSON extends AbstractComplexValueJSON {
    unit: string
    value: number
}

export interface IMeasurementValue extends IAbstractComplexValue {
    unit: string
    value: number
}

/**
 * valid unit strings must be defined in the classes extending AbstractMeasurement as enum
 */
export abstract class AbstractMeasurementValue extends AbstractComplexValue implements IMeasurementValue {
    @serialize()
    @validate()
    public unit: string

    @serialize()
    @validate()
    public value: number
}
