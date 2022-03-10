import { serialize, type, validate } from "@js-soft/ts-serval"
import { BirthName } from "./BirthName"
import { GivenName } from "./GivenName"
import { LegalName } from "./LegalName"
import { Pseudonym } from "./Pseudonym"
import { Surname } from "./Surname"

@type("LegalNameDE")
export class LegalNameDE extends LegalName {
    @serialize()
    @validate()
    public surname: Surname

    @serialize({ type: GivenName })
    @validate()
    public givenNames: GivenName[]

    @serialize()
    @validate()
    public birthName: BirthName

    @serialize()
    @validate()
    public pseudonym: Pseudonym
}
