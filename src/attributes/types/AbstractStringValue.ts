import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../AbstractAttributeValue"

export class AbstractStringValue extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
