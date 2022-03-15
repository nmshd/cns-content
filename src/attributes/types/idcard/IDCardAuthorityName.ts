import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("IDCardAuthorityName")
export class IDCardAuthorityName extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
