import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../AbstractAttributeValue"

export abstract class AbstractStringValue extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
