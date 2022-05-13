import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"
import { IResponse, Response, ResponseJSON } from "../requests/response/Response"

export interface IRelationshipCreationChangeRequestBodyJSON extends ContentJSON {
    templateContentMetadata?: object
    response: ResponseJSON
}

export interface IRelationshipCreationChangeRequestBody extends ISerializable {
    templateContentMetadata?: object
    response: IResponse
}

@type("RelationshipCreationChangeRequestBody")
export class RelationshipCreationChangeRequestBody
    extends Serializable
    implements IRelationshipCreationChangeRequestBody
{
    @serialize()
    @validate({ nullable: true })
    public templateContentMetadata?: object

    @serialize()
    @validate()
    public response: Response

    public static from(
        value: IRelationshipCreationChangeRequestBody | IRelationshipCreationChangeRequestBodyJSON
    ): RelationshipCreationChangeRequestBody {
        return this.fromAny(value)
    }
}
