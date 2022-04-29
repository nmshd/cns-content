import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { AbstractComplexValueJSON, IAbstractComplexValue } from "../../AbstractComplexValue"
import { AbstractStringJSON, IAbstractString } from "../AbstractString"
import { LegalName } from "./AbstractLegalName"
import { BirthName } from "./BirthName"
import { GivenName } from "./GivenName"
import { HonorificPrefix } from "./HonorificPrefix"
import { Pseudonym } from "./Pseudonym"
import { Surname } from "./Surname"

export interface LegalNameDEJSON extends AbstractComplexValueJSON {
    surname?: AbstractStringJSON
    givenNames?: AbstractStringJSON[]
    birthName?: AbstractStringJSON
    pseudonym?: AbstractStringJSON
    honorificPrefix?: AbstractStringJSON
}

export interface ILegalNameDE extends IAbstractComplexValue {
    surname?: Surname | IAbstractString | string
    givenNames?: GivenName[] | IAbstractString[] | string[]
    birthName?: BirthName | IAbstractString | string
    pseudonym?: Pseudonym | IAbstractString | string
    honorificPrefix?: HonorificPrefix | IAbstractString | string
}

@type("LegalNameDE")
export class LegalNameDE extends LegalName {
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
}
