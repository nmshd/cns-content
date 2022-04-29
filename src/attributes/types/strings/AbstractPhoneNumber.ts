import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractString } from "../AbstractString"

export abstract class AbstractPhoneNumber extends AbstractString {
    @serialize()
    @validate({ regExp: new RegExp(/^[\d+\-x#*() ]{3,100}$/) })
    public override value: string
}
