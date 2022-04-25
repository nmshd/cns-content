import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { AbstractStringValueJSON, IAbstractStringValue } from "../AbstractStringValue"
import { AbstractAddress, AbstractAddressJSON, IAbstractAddress } from "./AbstractAddress"
import { City } from "./City"
import { Country } from "./Country"
import { State } from "./State"
import { ZipCode } from "./ZipCode"

export interface PostOfficeBoxAddressJSON extends AbstractAddressJSON {
    boxId: AbstractStringValueJSON
    zipCode: AbstractStringValueJSON
    city: AbstractStringValueJSON
    country: AbstractStringValueJSON
    state?: AbstractStringValueJSON
}

export interface IPostOfficeBoxAddress extends IAbstractAddress {
    boxId: string
    zipCode: ZipCode | IAbstractStringValue | string
    city: City | IAbstractStringValue | string
    country: Country | IAbstractStringValue | string
    state?: State | IAbstractStringValue | string
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
