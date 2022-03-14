import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("BirthName")
export class BirthName extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
