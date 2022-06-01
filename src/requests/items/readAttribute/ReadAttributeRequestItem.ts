import { serialize, type, validate } from "@js-soft/ts-serval"
import {
    AbstractAttributeQuery,
    AbstractAttributeQueryJSON,
    IAbstractAttributeQuery
} from "../../../attributes/AbstractAttributeQuery"
import { IRequestItem, RequestItem, RequestItemJSON } from "../../RequestItem"

export interface ReadAttributeRequestItemJSON extends RequestItemJSON {
    query: AbstractAttributeQueryJSON
}

export interface IReadAttributeRequestItem extends IRequestItem {
    query: IAbstractAttributeQuery
}

@type("ReadAttributeRequestItem")
export class ReadAttributeRequestItem extends RequestItem implements IReadAttributeRequestItem {
    @serialize()
    @validate()
    public query: AbstractAttributeQuery

    public static from(value: IReadAttributeRequestItem | ReadAttributeRequestItemJSON): ReadAttributeRequestItem {
        return this.fromAny(value)
    }
}
