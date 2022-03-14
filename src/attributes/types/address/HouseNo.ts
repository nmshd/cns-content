import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"

@type("HouseNo")
export class HouseNo extends AbstractAttributeValue {
    @serialize()
    @validate()
    public value: string
}
