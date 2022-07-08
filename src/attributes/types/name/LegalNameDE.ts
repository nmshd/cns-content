import { serialize, type, validate } from "@js-soft/ts-serval"
import nameOf from "easy-tsnameof"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"
import { RenderHints, ValueHints } from "../../hints"
import { AbstractStringJSON, IAbstractString } from "../AbstractString"
import { LegalName } from "./AbstractLegalName"
import { BirthName } from "./BirthName"
import { GivenName } from "./GivenName"
import { HonorificPrefix } from "./HonorificPrefix"
import { Pseudonym } from "./Pseudonym"
import { Surname } from "./Surname"

export interface LegalNameDEJSON extends AbstractComplexValueJSON {
    surname: AbstractStringJSON
    givenNames: AbstractStringJSON[]
    birthName?: AbstractStringJSON
    pseudonym?: AbstractStringJSON
    honorificPrefix?: AbstractStringJSON
}

export interface ILegalNameDE extends IAbstractComplexValue {
    surname: Surname | IAbstractString | string
    givenNames: GivenName[] | IAbstractString[] | string[]
    birthName?: BirthName | IAbstractString | string
    pseudonym?: Pseudonym | IAbstractString | string
    honorificPrefix?: HonorificPrefix | IAbstractString | string
}

@type("LegalNameDE")
export class LegalNameDE extends LegalName {
    public static readonly propertyNames = nameOf<LegalNameDE, never>()

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate()
    public surname: Surname

    @serialize({ type: GivenName, customGenerator: AbstractAttributeValue.valueArrayGenerator })
    @validate()
    public givenNames: GivenName[]

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate({ nullable: true })
    public birthName?: BirthName

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate({ nullable: true })
    public pseudonym?: Pseudonym

    @serialize({ customGenerator: AbstractAttributeValue.valueGenerator })
    @validate({ nullable: true })
    public honorificPrefix?: HonorificPrefix

    public static get valueHints(): ValueHints {
        return ValueHints.from({
            propertyHints: {
                [this.propertyNames.surname.$path]: Surname.valueHints,
                [this.propertyNames.givenNames.$path]: GivenName.valueHints,
                [this.propertyNames.birthName.$path]: BirthName.valueHints,
                [this.propertyNames.pseudonym.$path]: Pseudonym.valueHints,
                [this.propertyNames.honorificPrefix.$path]: HonorificPrefix.valueHints
            }
        })
    }

    public static override get renderHints(): RenderHints {
        return super.renderHints.copyWith({
            propertyHints: {
                [this.propertyNames.surname.$path]: Surname.renderHints,
                [this.propertyNames.givenNames.$path]: GivenName.renderHints,
                [this.propertyNames.birthName.$path]: BirthName.renderHints,
                [this.propertyNames.pseudonym.$path]: Pseudonym.renderHints,
                [this.propertyNames.honorificPrefix.$path]: HonorificPrefix.renderHints
            }
        })
    }

    public override toString(): string {
        const value: string[] = []

        if (this.honorificPrefix) {
            value.push(this.honorificPrefix.toString())
        }

        value.push(this.givenNames.join(" "))

        value.push(this.surname.toString())

        if (this.pseudonym) {
            value.push(`aka "${this.pseudonym}"`)
        }

        return value.join(" ")
    }
}
