import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("Country")
export class Country extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
