import { ISerializableAsync, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { Attribute, AttributeJSON, IAttribute } from "../attributes/Attribute"
import { Authorization, AuthorizationJSON, IAuthorization } from "../authorizations/Authorization"
import { ContentJSON } from "../ContentJSON"
import {
    AttributesChangeRequest,
    AttributesChangeRequestJSON,
    IAttributesChangeRequest
} from "../requests/v1/AttributesChangeRequest"
import { AttributesRequest, AttributesRequestJSON, IAttributesRequest } from "../requests/v1/AttributesRequest"
import {
    AuthorizationGrantRequest,
    AuthorizationGrantRequestJSON,
    IAuthorizationGrantRequest
} from "../requests/v1/AuthorizationGrantRequest"
import { FormRequest, FormRequestJSON, IFormRequest } from "../requests/v1/FormRequest"
import { IPrivacyStatement, PrivacyStatement, PrivacyStatementJSON } from "../requests/v1/PrivacyStatement"
import {
    IRelationshipExistsAction,
    RelationshipExistsAction,
    RelationshipExistsActionJSON
} from "./RelationshipExistsAction"

export interface RelationshipTemplateBodyJSON extends ContentJSON {
    title?: string
    sessionIdentifier?: string
    metadata?: any
    sharedAttributes?: AttributeJSON[]
    sharedCertificates?: any[]
    sharedAuthorizations?: AuthorizationJSON[]
    requestedAttributesChanges?: AttributesChangeRequestJSON[]
    requestedAttributes?: AttributesRequestJSON[]
    requestedCertificates?: any[]
    requestedAuthorizations?: AuthorizationGrantRequestJSON[]
    requestedForms?: FormRequestJSON[]
    privacyStatement?: PrivacyStatementJSON
    relationshipExistsAction?: RelationshipExistsActionJSON
}

export interface IRelationshipTemplateBody extends ISerializableAsync {
    title?: string
    sessionIdentifier?: string
    metadata?: any
    sharedAttributes?: IAttribute[]
    sharedCertificates?: any[]
    sharedAuthorizations?: IAuthorization[]
    requestedAttributesChanges?: IAttributesChangeRequest[]
    requestedAttributes?: IAttributesRequest[]
    requestedCertificates?: IAttributesRequest[]
    requestedAuthorizations?: IAuthorizationGrantRequest[]
    requestedForms?: IFormRequest[]
    privacyStatement?: IPrivacyStatement
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

    @serialize({ type: Attribute })
    @validate({ nullable: true })
    public sharedAttributes?: Attribute[]

    @serialize()
    @validate({ nullable: true })
    public sharedCertificates?: any[]

    @serialize({ type: Authorization })
    @validate({ nullable: true })
    public sharedAuthorizations?: Authorization[]

    @serialize({ type: Attribute })
    @validate({ nullable: true })
    public requestedAttributesChanges?: AttributesChangeRequest[]

    @serialize({ type: AttributesRequest })
    @validate({ nullable: true })
    public requestedAttributes?: AttributesRequest[]

    @serialize()
    @validate({ nullable: true })
    public requestedCertificates?: any[]

    @serialize({ type: AuthorizationGrantRequest })
    @validate({ nullable: true })
    public requestedAuthorizations?: AuthorizationGrantRequest[]

    @serialize({ type: FormRequest })
    @validate({ nullable: true })
    public requestedForms?: FormRequest[]

    @serialize()
    @validate({ nullable: true })
    public privacyStatement?: PrivacyStatement

    @serialize()
    @validate({ nullable: true })
    public relationshipExistsAction?: RelationshipExistsAction

    public static async from(value: IRelationshipTemplateBody): Promise<RelationshipTemplateBody> {
        return (await super.from(value, RelationshipTemplateBody)) as RelationshipTemplateBody
    }
}
