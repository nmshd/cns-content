import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("Age")
export class Age extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: number
}
