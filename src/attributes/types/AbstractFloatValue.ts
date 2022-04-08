import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../AbstractAttributeValue"

export class AbstractFloatValue extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: number
}
