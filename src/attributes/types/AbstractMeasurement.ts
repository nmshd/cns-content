import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../AbstractAttributeValue"

/**
 * valid unit numbers must be defined in the classes extending AbstractMeasurement as enum
 */

export abstract class AbstractMeasurement extends AbstractAttributeValue {
    @serialize()
    @validate()
    public unit: number

    @serialize()
    @validate()
    public value: number
}
