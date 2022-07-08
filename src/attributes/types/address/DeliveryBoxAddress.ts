import { serialize, type, validate } from "@js-soft/ts-serval"
import nameOf from "easy-tsnameof"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { COUNTRIES_ALPHA2_TO_ENGLISH_NAME } from "../../constants"
import { RenderHints, RenderHintsEditType, RenderHintsTechnicalType, ValueHints } from "../../hints"
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
    public static override readonly propertyNames = nameOf<DeliveryBoxAddress, never>()

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

    public static override get valueHints(): ValueHints {
        return ValueHints.from({
            propertyHints: {
                [this.propertyNames.userId.$path]: ValueHints.from({}),
                [this.propertyNames.deliveryBoxId.$path]: ValueHints.from({}),
                [this.propertyNames.zipCode.$path]: ZipCode.valueHints,
                [this.propertyNames.city.$path]: City.valueHints,
                [this.propertyNames.country.$path]: Country.valueHints,
                [this.propertyNames.phoneNumber.$path]: Phone.valueHints,
                [this.propertyNames.state.$path]: State.valueHints
            }
        })
    }

    public static override get renderHints(): RenderHints {
        return super.renderHints.copyWith({
            propertyHints: {
                [this.propertyNames.userId.$path]: RenderHints.from({
                    editType: RenderHintsEditType.InputLike,
                    technicalType: RenderHintsTechnicalType.String
                }),
                [this.propertyNames.deliveryBoxId.$path]: RenderHints.from({
                    editType: RenderHintsEditType.InputLike,
                    technicalType: RenderHintsTechnicalType.String
                }),
                [this.propertyNames.zipCode.$path]: ZipCode.renderHints,
                [this.propertyNames.city.$path]: City.renderHints,
                [this.propertyNames.country.$path]: Country.renderHints,
                [this.propertyNames.phoneNumber.$path]: Phone.renderHints,
                [this.propertyNames.state.$path]: State.renderHints
            }
        })
    }

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
