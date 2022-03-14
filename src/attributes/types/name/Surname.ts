import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("Surname")
export class Surname extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
