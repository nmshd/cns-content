import { ISerializable, Serializable, serialize, type, validate } from "@js-soft/ts-serval"
import { Attribute, AttributeJSON, IAttribute } from "../attributes/Attribute"
import { Authorization, AuthorizationJSON, IAuthorization } from "../authorizations/Authorization"
import { ContentJSON } from "../ContentJSON"

export interface RelationshipCreationChangeRequestBodyJSON extends ContentJSON {
    title?: string
    sessionIdentifier?: string
    metadata?: any
    sharedAttributes?: AttributeJSON[]
    sharedCertificates?: any[]
    sharedAuthorizations?: AuthorizationJSON[]
}

export interface IRelationshipCreationChangeRequestBody extends ISerializable {
    title?: string
    sessionIdentifier?: string
    metadata?: any
    sharedAttributes?: IAttribute[]
    sharedCertificates?: any[]
    sharedAuthorizations?: IAuthorization[]
}

@type("RelationshipCreationChangeRequestBody")
export class RelationshipCreationChangeRequestBody
    extends Serializable
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

    @serialize({ type: Attribute })
    @validate({ nullable: true })
    public sharedAttributes?: Attribute[]

    @serialize()
    @validate({ nullable: true })
    public sharedCertificates?: any[]

    @serialize({ type: Authorization })
    @validate({ nullable: true })
    public sharedAuthorizations?: Authorization[]

    public static from(value: IRelationshipCreationChangeRequestBody): RelationshipCreationChangeRequestBody {
        return this.fromAny(value)
    }
}
