import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { AbstractStringValueJSON, IAbstractStringValue } from "../AbstractStringValue"
import { AbstractAddress, AbstractAddressJSON, IAbstractAddress } from "./AbstractAddress"
import { City } from "./City"
import { Country } from "./Country"
import { HouseNumber } from "./HouseNumber"
import { State } from "./State"
import { Street } from "./Street"
import { ZipCode } from "./ZipCode"

export interface StreetAddressJSON extends AbstractAddressJSON {
    street: AbstractStringValueJSON
    houseNo: AbstractStringValueJSON
    zipCode: AbstractStringValueJSON
    city: AbstractStringValueJSON
    country: AbstractStringValueJSON
    state?: AbstractStringValueJSON
}

export interface IStreetAddress extends IAbstractAddress {
    street: Street | IAbstractStringValue | string
    houseNo: HouseNumber | IAbstractStringValue | string
    zipCode: ZipCode | IAbstractStringValue | string
    city: City | IAbstractStringValue | string
    country: Country | IAbstractStringValue | string
    state?: State | IAbstractStringValue | string
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
}
