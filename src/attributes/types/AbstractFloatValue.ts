import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../AbstractAttributeValue"

export class AbstractDoubleValue extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: number
}
