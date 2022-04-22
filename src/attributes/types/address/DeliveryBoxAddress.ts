import { serialize, type, validate } from "@js-soft/ts-serval"
import { Phone } from "../communication"
import { AbstractAddress } from "./AbstractAddress"
import { City } from "./City"
import { Country } from "./Country"
import { State } from "./State"
import { ZipCode } from "./ZipCode"

@type("DeliveryBoxAddress")
export class DeliveryBoxAddress extends AbstractAddress {
    @serialize()
    @validate()
    public userId: string

    @serialize()
    @validate()
    public deliveryBoxId: string

    @serialize()
    @validate({ nullable: true })
    public phoneNumber?: Phone

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
