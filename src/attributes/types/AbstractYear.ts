import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../AbstractAttributeValue"

export abstract class AbstractYear extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: number
}
