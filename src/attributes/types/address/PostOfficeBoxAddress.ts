import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { AbstractStringJSON, IAbstractString } from "../AbstractString"
import { AbstractAddress, AbstractAddressJSON, IAbstractAddress } from "./AbstractAddress"
import { City } from "./City"
import { Country } from "./Country"
import { State } from "./State"
import { ZipCode } from "./ZipCode"

export interface PostOfficeBoxAddressJSON extends AbstractAddressJSON {
    boxId: AbstractStringJSON
    zipCode: AbstractStringJSON
    city: AbstractStringJSON
    country: AbstractStringJSON
    state?: AbstractStringJSON
}

export interface IPostOfficeBoxAddress extends IAbstractAddress {
    boxId: string
    zipCode: ZipCode | IAbstractString | string
    city: City | IAbstractString | string
    country: Country | IAbstractString | string
    state?: State | IAbstractString | string
}

@type("PostOfficeBoxAddress")
export class PostOfficeBoxAddress extends AbstractAddress implements IPostOfficeBoxAddress {
    @serialize()
    @validate()
    public boxId: string

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

    public static from(value: IPostOfficeBoxAddress | PostOfficeBoxAddressJSON): PostOfficeBoxAddress {
        return this.fromAny(value)
    }
}
