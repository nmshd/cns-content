import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttribute } from "../../AbstractAttribute"
import { DisplayName } from "./DisplayName"
import { LegalName } from "./LegalName"
import { Title } from "./Title"

// TODO: Herr/Frau/Ms./Mr.

@type("Salutation")
export class Salutation extends AbstractAttribute {
    @serialize()
    @validate()
    public displayName: DisplayName

    @serialize()
    @validate({ nullable: true })
    public legalName?: LegalName

    @serialize({ type: Title })
    @validate({ nullable: true })
    public titles?: Title[]
}
