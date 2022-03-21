import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("IDCardIssuingDate")
export class IDCardIssuingDate extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
