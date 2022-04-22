import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractStringValue } from "../AbstractStringValue"

export abstract class AbstractURLValue extends AbstractStringValue {
    @serialize()
    @validate()
    public override value: string
}
