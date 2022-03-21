import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("City")
export class City extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
