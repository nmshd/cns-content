import { serialize, type, validate } from "@js-soft/ts-serval"
import nameOf from "easy-tsnameof"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { COUNTRIES_ALPHA2_TO_ENGLISH_NAME } from "../../constants"
import { RenderHints, RenderHintsEditType, RenderHintsTechnicalType, ValueHints } from "../../hints"
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
    public static override readonly propertyNames = nameOf<PostOfficeBoxAddress, never>()

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

    public static override get valueHints(): ValueHints {
        return ValueHints.from({
            propertyHints: {
                [this.propertyNames.boxId.$path]: ValueHints.from({}),
                [this.propertyNames.zipCode.$path]: ZipCode.valueHints,
                [this.propertyNames.city.$path]: City.valueHints,
                [this.propertyNames.country.$path]: Country.valueHints,
                [this.propertyNames.state.$path]: State.valueHints
            }
        })
    }

    public static override get renderHints(): RenderHints {
        return super.renderHints.copyWith({
            propertyHints: {
                [this.propertyNames.boxId.$path]: RenderHints.from({
                    editType: RenderHintsEditType.InputLike,
                    technicalType: RenderHintsTechnicalType.String
                }),
                [this.propertyNames.zipCode.$path]: ZipCode.renderHints,
                [this.propertyNames.city.$path]: City.renderHints,
                [this.propertyNames.country.$path]: Country.renderHints,
                [this.propertyNames.state.$path]: State.renderHints
            }
        })
    }

    public static from(value: IPostOfficeBoxAddress | PostOfficeBoxAddressJSON): PostOfficeBoxAddress {
        return this.fromAny(value)
    }

    public override toString(): string {
        const value: string[] = []
        value.push(`${this.recipient}`)
        value.push(`${this.boxId}`)
        value.push(`${this.zipCode} ${this.city}`)
        if (this.state) {
            value.push(this.state.toString())
        }
        const countryName = COUNTRIES_ALPHA2_TO_ENGLISH_NAME.get(this.country.value)
        value.push(countryName ? countryName : this.country.toString())

        return value.join("\n")
    }
}
