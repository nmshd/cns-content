import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"
import { IResponse, Response, ResponseJSON } from "../requests/response/Response"

export interface IRelationshipCreationChangeRequestContentJSON extends ContentJSON {
    templateContentMetadata?: object
    response: ResponseJSON
}

export interface IRelationshipCreationChangeRequestContent extends ISerializable {
    templateContentMetadata?: object
    response: IResponse
}

@type("RelationshipCreationChangeRequestContent")
export class RelationshipCreationChangeRequestContent
    extends Serializable
    implements IRelationshipCreationChangeRequestContent
{
    @serialize()
    @validate({ nullable: true })
    public templateContentMetadata?: object

    @serialize()
    @validate()
    public response: Response

    public static from(value: IRelationshipCreationChangeRequestContent): RelationshipCreationChangeRequestContent {
        return this.fromAny(value)
    }
}
