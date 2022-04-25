import { serialize, type, validate } from "@js-soft/ts-serval"
import {
    AbstractAttributeValue,
    AbstractAttributeValueJSON,
    IAbstractAttributeValue
} from "../../AbstractAttributeValue"
import { AbstractStringValueJSON, IAbstractStringValue } from "../AbstractStringValue"
import { DisplayName } from "./DisplayName"
import { GivenName } from "./GivenName"
import { Surname } from "./Surname"
import { Title } from "./Title"

export interface SalutationJSON extends AbstractAttributeValueJSON {
    displayName: AbstractStringValueJSON
    givenNames?: AbstractStringValueJSON[]
    surname?: AbstractStringValueJSON
    titles?: AbstractStringValueJSON[]
}

export interface ISalutation extends IAbstractAttributeValue {
    displayName: DisplayName | IAbstractStringValue | string
    givenNames?: GivenName[] | IAbstractStringValue[] | string[]
    surname?: Surname | IAbstractStringValue | string
    titles?: Title[] | IAbstractStringValue[] | string[]
}

@type("Salutation")
export class Salutation extends AbstractAttributeValue implements ISalutation {
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
