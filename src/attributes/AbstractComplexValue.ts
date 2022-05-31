import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "./AbstractAttributeValue"

export interface AbstractComplexValueJSON extends AbstractAttributeValueJSON, Record<string, unknown> {}

export interface IAbstractComplexValue extends IAbstractAttributeValue, Record<string, unknown> {}

export abstract class AbstractComplexValue extends AbstractAttributeValue implements IAbstractComplexValue {
    [x: string]: unknown
}
