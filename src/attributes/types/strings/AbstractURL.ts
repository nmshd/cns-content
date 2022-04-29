import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractString } from "../AbstractString"

export abstract class AbstractURL extends AbstractString {
    @serialize()
    @validate({
        regExp: new RegExp(
            // eslint-disable-next-line no-useless-escape
            /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)$/i
        )
    })
    public override value: string
}
