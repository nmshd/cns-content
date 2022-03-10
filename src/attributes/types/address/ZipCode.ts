import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute } from "../../AbstractAttribute"

@type("ZipCode")
export class ZipCode extends AbstractAttribute {
    @serialize()
    @validate()
    public value: string
}
