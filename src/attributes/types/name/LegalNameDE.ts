import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { LegalName } from "./AbstractLegalName"
import { BirthName } from "./BirthName"
import { GivenName } from "./GivenName"
import { Pseudonym } from "./Pseudonym"
import { Surname } from "./Surname"

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
}
