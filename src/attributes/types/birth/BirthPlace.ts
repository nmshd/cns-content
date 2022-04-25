import { serialize, type, validate } from "@js-soft/ts-serval"
import {
    AbstractAttributeValue,
    AbstractAttributeValueJSON,
    IAbstractAttributeValue
} from "../../AbstractAttributeValue"
import { AbstractStringValueJSON, IAbstractStringValue } from "../AbstractStringValue"
import { BirthCity } from "./BirthCity"
import { BirthCountry } from "./BirthCountry"
import { BirthState } from "./BirthState"

export interface BirthPlaceJSON extends AbstractAttributeValueJSON {
    city: AbstractStringValueJSON
    country?: AbstractStringValueJSON
    state?: AbstractStringValueJSON
}

export interface IBirthPlace extends IAbstractAttributeValue {
    city: BirthCity | IAbstractStringValue | number
    country?: BirthCountry | IAbstractStringValue | number
    state?: BirthState | IAbstractStringValue | number
}

@type("BirthPlace")
export class BirthPlace extends AbstractAttributeValue implements IBirthPlace {
    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public city: BirthCity

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate({ nullable: true })
    public country?: BirthCountry

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate({ nullable: true })
    public state?: BirthState

    public static from(value: IBirthPlace | BirthPlaceJSON): BirthPlace {
        return this.fromAny(value)
    }
}
