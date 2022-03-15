import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAddress } from "./AbstractAddress"
import { City } from "./City"
import { Country } from "./Country"
import { HouseNumber } from "./HouseNumber"
import { State } from "./State"
import { Street } from "./Street"
import { ZipCode } from "./ZipCode"

@type("StreetAddress")
export class StreetAddress extends AbstractAddress {
    @serialize()
    @validate()
    public street: Street

    @serialize()
    @validate()
    public houseNo: HouseNumber

    @serialize()
    @validate()
    public zipCode: ZipCode

    @serialize()
    @validate()
    public city: City

    @serialize()
    @validate()
    public country: Country

    @serialize()
    @validate({ nullable: true })
    public state?: State
}
