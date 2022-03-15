import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

/**
 * valid unit strings must be defined in the classes extending AbstractMeasurement as enum
 */
export abstract class AbstractMeasurement extends AbstractAttributeValue {
    @serialize()
    @validate()
    public unit: { value: string }

    @serialize()
    @validate()
    public value: { value: number }
}
