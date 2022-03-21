import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("PersonEyeColor")
export class PersonEyeColor extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
