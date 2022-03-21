import { ISerializable, Serializable } from "@js-soft/ts-serval"
import { ContentJSON } from "../ContentJSON"

export interface AbstractAttributeValueJSON extends ContentJSON, Record<string, unknown> {}

export interface IAbstractAttributeValue extends ISerializable, Record<string, unknown> {}

export abstract class AbstractAttributeValue extends Serializable implements IAbstractAttributeValue {
    [key: string]: unknown
}
