import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("ZipCode")
export class ZipCode extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
