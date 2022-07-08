import { serialize, type, validate } from "@js-soft/ts-serval"
import nameOf from "easy-tsnameof"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { AbstractComplexValue, AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"
import { RenderHints, ValueHints } from "../../hints"
import { AbstractStringJSON, IAbstractString } from "../AbstractString"
import { DisplayName } from "./DisplayName"
import { GivenName } from "./GivenName"
import { HonorificPrefix } from "./HonorificPrefix"
import { HonorificSuffix } from "./HonorificSuffix"
import { Surname } from "./Surname"

export interface SalutationJSON extends AbstractComplexValueJSON {
    displayName: AbstractStringJSON
    givenNames?: AbstractStringJSON[]
    surname?: AbstractStringJSON
    honorificSuffix?: AbstractStringJSON
    honorificPrefix?: AbstractStringJSON
}

export interface ISalutation extends IAbstractComplexValue {
    displayName: DisplayName | IAbstractString | string
    givenNames?: GivenName[] | IAbstractString[] | string[]
    surname?: Surname | IAbstractString | string
    honorificSuffix?: HonorificSuffix | IAbstractString | string
    honorificPrefix?: HonorificPrefix | IAbstractString | string
}

@type("Salutation")
export class Salutation extends AbstractComplexValue implements ISalutation {
    public static readonly propertyNames = nameOf<Salutation, never>()

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public displayName: DisplayName

    @serialize({ type: GivenName, customGenerator: AbstractAttributeValue.valueArrayGenerator })
    @validate({ nullable: true })
    public givenNames?: GivenName[]

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate({ nullable: true })
    public surname?: Surname

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate({ nullable: true })
    public honorificSuffix?: HonorificSuffix

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate({ nullable: true })
    public honorificPrefix?: HonorificPrefix

    public static get valueHints(): ValueHints {
        return ValueHints.from({
            propertyHints: {
                [this.propertyNames.displayName.$path]: DisplayName.valueHints,
                [this.propertyNames.givenNames.$path]: GivenName.valueHints,
                [this.propertyNames.surname.$path]: Surname.valueHints,
                [this.propertyNames.honorificSuffix.$path]: HonorificSuffix.valueHints,
                [this.propertyNames.honorificPrefix.$path]: HonorificPrefix.valueHints
            }
        })
    }

    public static override get renderHints(): RenderHints {
        return super.renderHints.copyWith({
            propertyHints: {
                [this.propertyNames.displayName.$path]: DisplayName.renderHints,
                [this.propertyNames.givenNames.$path]: GivenName.renderHints,
                [this.propertyNames.surname.$path]: Surname.renderHints,
                [this.propertyNames.honorificSuffix.$path]: HonorificSuffix.renderHints,
                [this.propertyNames.honorificPrefix.$path]: HonorificPrefix.renderHints
            }
        })
    }

    public static from(value: ISalutation | SalutationJSON): Salutation {
        return this.fromAny(value)
    }

    public override toString(): string {
        return this.displayName.toString()
    }
}
