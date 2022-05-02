import { serialize, validate } from "@js-soft/ts-serval"
import { CountryAlpha2 } from "../../constants/CountriesAlpha2"
import { AbstractString } from "../AbstractString"

export abstract class AbstractCountry extends AbstractString {
    @serialize()
    @validate({
        customValidator: (v) =>
            !Object.values(CountryAlpha2).includes(v) ? `must be one of: ${Object.values(CountryAlpha2)}` : undefined
    })
    public override value: CountryAlpha2
}
