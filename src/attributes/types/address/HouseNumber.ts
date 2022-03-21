import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("HouseNumber")
export class HouseNumber extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
