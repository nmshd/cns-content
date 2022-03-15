import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("Title")
export class Title extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
