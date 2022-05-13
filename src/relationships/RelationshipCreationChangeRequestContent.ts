import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { IResponse, Response } from "../requests/response/Response"

export interface IRelationshipCreationChangeRequestContent extends ISerializable {
    response: IResponse
}

@type("RelationshipCreationChangeRequestContent")
export class RelationshipCreationChangeRequestContent
    extends Serializable
    implements IRelationshipCreationChangeRequestContent
{
    @serialize()
    @validate()
    public response: Response

    public static from(value: IRelationshipCreationChangeRequestContent): RelationshipCreationChangeRequestContent {
        return this.fromAny(value)
    }
}
