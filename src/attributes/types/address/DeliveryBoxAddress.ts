import { serialize, type, validate } from "@js-soft/ts-serval"
import { COUNTRIES_ALPHA2_TO_ENGLISH_NAME } from "src/attributes/constants"
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

    public override toString(): string {
        const value: string[] = []
        value.push(`${this.recipient}`)
        value.push(`${this.userId}`)
        if (this.phoneNumber) {
            value.push(this.phoneNumber.toString())
        }
        value.push(`${this.deliveryBoxId}`)
        value.push(`${this.zipCode} ${this.city}`)
        if (this.state) {
            value.push(this.state.toString())
        }
        const countryName = COUNTRIES_ALPHA2_TO_ENGLISH_NAME.get(this.country.value)
        value.push(countryName ? countryName : this.country.toString())

        return value.join("\n")
    }
}
