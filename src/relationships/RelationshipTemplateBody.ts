import { ISerializableAsync, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { AttributeV2, AttributeV2JSON, IAttributeV2 } from "../attributes/AttributeV2"
import { Authorization, AuthorizationJSON, IAuthorization } from "../authorizations/Authorization"
import { ContentJSON } from "../ContentJSON"
import {
    AttributesChangeRequest,
    AttributesChangeRequestJSON,
    IAttributesChangeRequest
} from "../requests/old/AttributesChangeRequest"
import { AttributesRequest, AttributesRequestJSON, IAttributesRequest } from "../requests/old/AttributesRequest"
import {
    IRelationshipExistsAction,
    RelationshipExistsAction,
    RelationshipExistsActionJSON
} from "./RelationshipExistsAction"

export interface RelationshipTemplateBodyJSON extends ContentJSON {
    title?: string
    sessionIdentifier?: string
    metadata?: any
    sharedAttributes?: AttributeV2JSON[]
    sharedCertificates?: any[]
    sharedAuthorizations?: AuthorizationJSON[]
    requestedAttributesChanges?: AttributesChangeRequestJSON[]
    requestedAttributes?: AttributesRequestJSON[]
    requestedCertificates?: any[]
    relationshipExistsAction?: RelationshipExistsActionJSON
}

export interface IRelationshipTemplateBody extends ISerializableAsync {
    title?: string
    sessionIdentifier?: string
    metadata?: any
    sharedAttributes?: IAttributeV2[]
    sharedCertificates?: any[]
    sharedAuthorizations?: IAuthorization[]
    requestedAttributesChanges?: IAttributesChangeRequest[]
    requestedAttributes?: IAttributesRequest[]
    relationshipExistsAction?: IRelationshipExistsAction
}

@type("RelationshipTemplateBody")
export class RelationshipTemplateBody extends SerializableAsync implements IRelationshipTemplateBody {
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

    @serialize({ type: AttributeV2 })
    @validate({ nullable: true })
    public requestedAttributesChanges?: AttributesChangeRequest[]

    @serialize({ type: AttributesRequest })
    @validate({ nullable: true })
    public requestedAttributes?: AttributesRequest[]

    @serialize()
    @validate({ nullable: true })
    public relationshipExistsAction?: RelationshipExistsAction

    public static async from(value: IRelationshipTemplateBody): Promise<RelationshipTemplateBody> {
        return (await super.from(value, RelationshipTemplateBody)) as RelationshipTemplateBody
    }
}
