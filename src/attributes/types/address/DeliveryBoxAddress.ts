import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { AbstractStringJSON, IAbstractString } from "../AbstractString"
import { Phone } from "../communication"
import { AbstractAddress, AbstractAddressJSON, IAbstractAddress } from "./AbstractAddress"
import { City } from "./City"
import { Country } from "./Country"
import { State } from "./State"
import { ZipCode } from "./ZipCode"

export interface DeliveryBoxAddressJSON extends AbstractAddressJSON {
    userId: string
    deliveryBoxId: string
    zipCode: AbstractStringJSON
    city: AbstractStringJSON
    country: AbstractStringJSON
    phoneNumber?: AbstractStringJSON
    state?: AbstractStringJSON
}

export interface IDeliveryBoxAddress extends IAbstractAddress {
    userId: string
    deliveryBoxId: string
    zipCode: ZipCode | IAbstractString | string
    city: City | IAbstractString | string
    country: Country | IAbstractString | string
    phoneNumber?: Phone | IAbstractString | string
    state?: State | IAbstractString | string
}

@type("DeliveryBoxAddress")
export class DeliveryBoxAddress extends AbstractAddress implements IDeliveryBoxAddress {
    @serialize()
    @validate()
    public userId: string

    @serialize()
    @validate()
    public deliveryBoxId: string

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
    public phoneNumber?: Phone

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate({ nullable: true })
    public state?: State

    public static from(value: IDeliveryBoxAddress | DeliveryBoxAddressJSON): DeliveryBoxAddress {
        return this.fromAny(value)
    }
}
