import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { AbstractComplexValue, AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"
import { AbstractStringJSON, IAbstractString } from "../AbstractString"
import { BirthCity } from "./BirthCity"
import { BirthCountry } from "./BirthCountry"
import { BirthState } from "./BirthState"

export interface BirthPlaceJSON extends AbstractComplexValueJSON {
    city: AbstractStringJSON
    country: AbstractStringJSON
    state?: AbstractStringJSON
}

export interface IBirthPlace extends IAbstractComplexValue {
    city: BirthCity | IAbstractString | number
    country: BirthCountry | IAbstractString | number
    state?: BirthState | IAbstractString | number
}

@type("BirthPlace")
export class BirthPlace extends AbstractComplexValue implements IBirthPlace {
    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public city: BirthCity

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate({ nullable: true })
    public country: BirthCountry

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate({ nullable: true })
    public state?: BirthState

    public static from(value: IBirthPlace | BirthPlaceJSON): BirthPlace {
        return this.fromAny(value)
    }
}
