import { ISerializableAsync, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { AttributeV2, AttributeV2JSON, IAttributeV2 } from "../attributes/AttributeV2"
import { Authorization, AuthorizationJSON, IAuthorization } from "../authorizations/Authorization"
import { ContentJSON } from "../ContentJSON"

export interface RelationshipCreationChangeRequestBodyJSON extends ContentJSON {
    title?: string
    sessionIdentifier?: string
    metadata?: any
    sharedAttributes?: AttributeV2JSON[]
    sharedCertificates?: any[]
    sharedAuthorizations?: AuthorizationJSON[]
}

export interface IRelationshipCreationChangeRequestBody extends ISerializableAsync {
    title?: string
    sessionIdentifier?: string
    metadata?: any
    sharedAttributes?: IAttributeV2[]
    sharedCertificates?: any[]
    sharedAuthorizations?: IAuthorization[]
}

@type("RelationshipCreationChangeRequestBody")
export class RelationshipCreationChangeRequestBody
    extends SerializableAsync
    implements IRelationshipCreationChangeRequestBody
{
    @serialize()
    @validate({ nullable: true })
    public title?: string

    @serialize()
    @validate({ nullable: true })
    public sessionIdentifier?: string

    @serialize({ any: true })
    @validate({ nullable: true })
    public metadata?: any

    @serialize({ type: AttributeV2 })
    @validate({ nullable: true })
    public sharedAttributes?: AttributeV2[]

    @serialize()
    @validate({ nullable: true })
    public sharedCertificates?: any[]

    @serialize({ type: Authorization })
    @validate({ nullable: true })
    public sharedAuthorizations?: Authorization[]

    public static async from(
        value: IRelationshipCreationChangeRequestBody
    ): Promise<RelationshipCreationChangeRequestBody> {
        return (await super.from(value, RelationshipCreationChangeRequestBody)) as RelationshipCreationChangeRequestBody
    }
}
