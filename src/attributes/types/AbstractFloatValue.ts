import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../AbstractAttributeValue"

export abstract class AbstractFloatValue extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: number
}
