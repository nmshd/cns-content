import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractStringValue } from "../AbstractStringValue"

export abstract class AbstractCSSColorValue extends AbstractStringValue {
    @serialize()
    @validate()
    public override value: string
}
