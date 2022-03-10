import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttribute } from "../../AbstractAttribute"

export class Address extends AbstractAttribute {
    @serialize()
    @validate()
    public recipient: string
}
