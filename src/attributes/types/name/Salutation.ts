import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { AbstractComplexValue, AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"
import { AbstractStringJSON, IAbstractString } from "../AbstractString"
import { DisplayName } from "./DisplayName"
import { GivenName } from "./GivenName"
import { Surname } from "./Surname"
import { Title } from "./Title"

export interface SalutationJSON extends AbstractComplexValueJSON {
    displayName: AbstractStringJSON
    givenNames?: AbstractStringJSON[]
    surname?: AbstractStringJSON
    titles?: AbstractStringJSON[]
}

export interface ISalutation extends IAbstractComplexValue {
    displayName: DisplayName | IAbstractString | string
    givenNames?: GivenName[] | IAbstractString[] | string[]
    surname?: Surname | IAbstractString | string
    titles?: Title[] | IAbstractString[] | string[]
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

    @serialize({ type: Title, customGenerator: AbstractAttributeValue.valueArrayGenerator })
    @validate({ nullable: true })
    public titles?: Title[]

    public static from(value: ISalutation | SalutationJSON): Salutation {
        return this.fromAny(value)
    }
}
