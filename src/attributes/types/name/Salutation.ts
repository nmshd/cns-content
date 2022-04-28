import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { AbstractComplexValue, AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"
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

    public static from(value: ISalutation | SalutationJSON): Salutation {
        return this.fromAny(value)
    }
}
