import { serialize, validate } from "@js-soft/ts-serval"
import { CountriesAlpha2 } from "../../constants/CountriesAlpha2"
import { AbstractString } from "../AbstractString"

export abstract class AbstractCountry extends AbstractString {
    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(CountriesAlpha2).includes(v)
                ? `must be one of: ${Object.values(CountriesAlpha2)}`
                : undefined
    })
    public override value: CountriesAlpha2
}
