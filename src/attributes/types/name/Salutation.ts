import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeValue } from "../../AbstractAttributeValue"
import { DisplayName } from "./DisplayName"
import { GivenName } from "./GivenName"
import { Surname } from "./Surname"
import { Title } from "./Title"

@type("Salutation")
export class Salutation extends AbstractAttributeValue {
    @serialize()
    @validate()
    public displayName: DisplayName

    @serialize()
    @validate({ nullable: true })
    public givenName?: GivenName

    @serialize()
    @validate({ nullable: true })
    public surname?: Surname

    @serialize({ type: Title })
    @validate({ nullable: true })
    public titles?: Title[]
}
