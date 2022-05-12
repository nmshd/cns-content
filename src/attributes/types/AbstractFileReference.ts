import { serialize, validate } from "@js-soft/ts-serval"
import { FileReference, IFileReference } from "@nmshd/transport"
import { AbstractAttributeValue, AbstractAttributeValueJSON, IAbstractAttributeValue } from "../AbstractAttributeValue"

export type AbstractFileReferenceJSON = IAbstractFileReferenceJSON | string

export interface IAbstractFileReferenceJSON extends AbstractAttributeValueJSON {
    value: string
}

export interface IAbstractFileReference extends IAbstractAttributeValue {
    value: IFileReference
}

export class AbstractFileReference extends AbstractAttributeValue implements IAbstractFileReference {
    @serialize()
    @validate()
    public value: FileReference

    public override toString(): string {
        return `${this.value}`
    }
}
