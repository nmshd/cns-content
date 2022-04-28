import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractString } from "../AbstractString"

export abstract class AbstractHEXColor extends AbstractString {
    @serialize()
    @validate({ regExp: new RegExp("^#([0-9A-F]{3}){1,2}$", "i") })
    public override value: string
}
