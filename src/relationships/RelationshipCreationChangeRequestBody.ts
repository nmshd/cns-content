import { ISerializableAsync, SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { Attribute, AttributeJSON, IAttribute } from "../attributes/Attribute"
import { Authorization, AuthorizationJSON, IAuthorization } from "../authorizations/Authorization"
import { ContentJSON } from "../ContentJSON"
import { FormRequest, FormRequestJSON, IFormRequest } from "../requests/FormRequest"
import { IPrivacyStatement, PrivacyStatement, PrivacyStatementJSON } from "../requests/PrivacyStatement"

export interface RelationshipCreationChangeRequestBodyJSON extends ContentJSON {
    title?: string
    sessionIdentifier?: string
    metadata?: any
    sharedAttributes?: AttributeJSON[]
    sharedCertificates?: any[]
    sharedAuthorizations?: AuthorizationJSON[]
    sharedForms?: FormRequestJSON[]
    privacyStatementResponse?: PrivacyStatementJSON
}

export interface IRelationshipCreationChangeRequestBody extends ISerializableAsync {
    title?: string
    sessionIdentifier?: string
    metadata?: any
    sharedAttributes?: IAttribute[]
    sharedCertificates?: any[]
    sharedAuthorizations?: IAuthorization[]
    sharedForms?: IFormRequest[]
    privacyStatementResponse?: IPrivacyStatement
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

    @serialize({ type: Attribute })
    @validate({ nullable: true })
    public sharedAttributes?: Attribute[]

    @serialize()
    @validate({ nullable: true })
    public sharedCertificates?: any[]

    @serialize({ type: Authorization })
    @validate({ nullable: true })
    public sharedAuthorizations?: Authorization[]

    @serialize({ type: FormRequest })
    @validate({ nullable: true })
    public sharedForms?: FormRequest[]

    @serialize()
    @validate({ nullable: true })
    public privacyStatementResponse?: PrivacyStatement

    public static async from(
        value: IRelationshipCreationChangeRequestBody
    ): Promise<RelationshipCreationChangeRequestBody> {
        return (await super.from(value, RelationshipCreationChangeRequestBody)) as RelationshipCreationChangeRequestBody
    }
}
