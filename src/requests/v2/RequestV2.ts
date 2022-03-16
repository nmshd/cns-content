import { SerializableAsync, serialize, type, validate } from "@js-soft/ts-serval"
import { CoreDate, CoreId } from "@nmshd/transport"
import { IRequestV2 } from "./IRequestV2"
import { RequestV2JSON } from "./RequestV2JSON"

// **********************************************Classes********************************************************* //
@type("RequestV2")
export class RequestV2 extends SerializableAsync implements IRequestV2 {
    @serialize()
    @validate({ nullable: true })
    public id?: CoreId

    @serialize()
    @validate({ nullable: true })
    public expiresAt?: CoreDate

    @serialize()
    @validate({ customValidator: (v) => (v.length < 1 ? "may not be empty" : undefined) })
    public items: (RequestItemGroupV2 | RequestItemV2)[]

    public static async from(value: IRequestV2 | RequestV2JSON): Promise<RequestV2> {
        return await SerializableAsync.fromT<RequestV2>(value, RequestV2)
    }
}

@type("RequestItem")
export class RequestItemV2 extends SerializableAsync {
    @serialize()
    @validate({ nullable: true })
    public title?: string
    @serialize()
    @validate({ nullable: true })
    public description?: string

    @serialize()
    @validate()
    public mustBeAccepted: boolean

    @serialize()
    @validate({ nullable: true })
    public responseMetadata?: object
}

@type("RequestItemGroup")
export class RequestItemGroupV2 extends SerializableAsync {
    @serialize()
    @validate({ nullable: true })
    public title?: string

    @serialize()
    @validate({ nullable: true })
    public description?: string

    @serialize()
    @validate()
    public mustBeAccepted: boolean

    @serialize()
    @validate({ customValidator: (v) => (v.length < 1 ? "may not be empty" : undefined) })
    public items: RequestItemV2[]

    @serialize()
    @validate({ nullable: true })
    public responseMetadata?: object
}
