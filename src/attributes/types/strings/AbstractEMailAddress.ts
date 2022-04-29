import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractString } from "../AbstractString"

export abstract class AbstractEMailAddress extends AbstractString {
    // from https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
    @serialize()
    @validate({
        regExp: new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$", "i")
    })
    public override value: string
}
