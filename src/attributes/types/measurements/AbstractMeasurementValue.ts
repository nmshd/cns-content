import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue, AbstractAttributeValueJSON } from "../../AbstractAttributeValue"

export interface AbstractMeasurementValueJSON extends AbstractAttributeValueJSON {
    unit: string
    value: number
}

/**
 * valid unit strings must be defined in the classes extending AbstractMeasurement as enum
 */
export abstract class AbstractMeasurementValue extends AbstractAttributeValue {
    @serialize()
    @validate()
    public unit: string

    @serialize()
    @validate()
    public value: number
}
