import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractLegalName } from "./AbstractLegalName"
import { BirthName } from "./BirthName"
import { GivenName } from "./GivenName"
import { Pseudonym } from "./Pseudonym"
import { Surname } from "./Surname"

@type("LegalNameDE")
export class LegalNameDE extends AbstractLegalName {
    @serialize()
    @validate()
    public surname: Surname

    @serialize({ type: GivenName })
    @validate()
    public givenNames: GivenName[]

    @serialize()
    @validate({ nullable: true })
    public birthName?: BirthName

    @serialize()
    @validate({ nullable: true })
    public pseudonym?: Pseudonym
}
