import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("Street")
export class Street extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
