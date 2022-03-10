import { serialize, type, validate } from "@js-soft/ts-serval"
import { Address } from "./Address"
import { City } from "./City"
import { Country } from "./Country"
import { HouseNo } from "./HouseNo"
import { State } from "./State"
import { Street } from "./Street"
import { ZipCode } from "./ZipCode"

@type("StreetAddress")
export class StreetAddress extends Address {
    @serialize()
    @validate()
    public street: Street

    @serialize()
    @validate()
    public houseNo: HouseNo

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
    @validate()
    public state: State
}
