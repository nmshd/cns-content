import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { COUNTRIES_ALPHA2_TO_ENGLISH_NAME } from "../../constants"
import { RenderHints, ValueHints } from "../../hints"
import { AbstractStringJSON, IAbstractString } from "../AbstractString"
import { AbstractAddress, AbstractAddressJSON, IAbstractAddress } from "./AbstractAddress"
import { City } from "./City"
import { Country } from "./Country"
import { HouseNumber } from "./HouseNumber"
import { State } from "./State"
import { Street } from "./Street"
import { ZipCode } from "./ZipCode"

export interface StreetAddressJSON extends AbstractAddressJSON {
    street: AbstractStringJSON
    houseNo: AbstractStringJSON
    zipCode: AbstractStringJSON
    city: AbstractStringJSON
    country: AbstractStringJSON
    state?: AbstractStringJSON
}

export interface IStreetAddress extends IAbstractAddress {
    street: Street | IAbstractString | string
    houseNo: HouseNumber | IAbstractString | string
    zipCode: ZipCode | IAbstractString | string
    city: City | IAbstractString | string
    country: Country | IAbstractString | string
    state?: State | IAbstractString | string
}

@type("StreetAddress")
export class StreetAddress extends AbstractAddress implements IStreetAddress {
    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public street: Street

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public houseNo: HouseNumber

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public zipCode: ZipCode

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public city: City

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public country: Country

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate({ nullable: true })
    public state?: State

    public static from(value: IStreetAddress | StreetAddressJSON): StreetAddress {
        return this.fromAny(value)
    }

    public static get valueHints(): ValueHints {
        return ValueHints.from({
            subHints: {
                street: Street.valueHints,
                houseNo: HouseNumber.valueHints,
                zipCode: ZipCode.valueHints,
                city: City.valueHints,
                county: Country.valueHints,
                state: State.valueHints
            }
        })
    }

    public static override get renderHints(): RenderHints {
        return super.renderHints.copyWith({
            subHints: {
                street: Street.renderHints,
                houseNo: HouseNumber.renderHints,
                zipCode: ZipCode.renderHints,
                city: City.renderHints,
                county: Country.renderHints,
                state: State.renderHints
            }
        })
    }

    public override toString(): string {
        const value: string[] = []
        value.push(`${this.recipient}`)
        value.push(`${this.street} ${this.houseNo}`)
        value.push(`${this.zipCode} ${this.city}`)
        if (this.state) {
            value.push(this.state.toString())
        }
        const countryName = COUNTRIES_ALPHA2_TO_ENGLISH_NAME.get(this.country.value)
        value.push(countryName ? countryName : this.country.toString())

        return value.join("\n")
    }
}
