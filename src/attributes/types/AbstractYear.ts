import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractAttribute } from "../AbstractAttribute"

export abstract class AbstractYear extends AbstractAttribute {
    @serialize()
    @validate()
    public value: number
}
