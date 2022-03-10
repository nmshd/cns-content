import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute } from "../../AbstractAttribute"

@type("Country")
export class Country extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string
}
