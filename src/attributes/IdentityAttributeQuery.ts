import { serialize, type, validate } from "@js-soft/ts-serval"
import { AbstractAttributeQuery, AbstractAttributeQueryJSON, IAbstractAttributeQuery } from "./AbstractAttributeQuery"

export interface IdentityAttributeQueryJSON extends AbstractAttributeQueryJSON {
    tags?: string[]
}

export interface IIdentityAttributeQuery extends IAbstractAttributeQuery {
    tags?: string[]
}

@type("IdentityAttributeQuery")
export class IdentityAttributeQuery extends AbstractAttributeQuery implements IIdentityAttributeQuery {
    @serialize({ type: String })
    @validate({ nullable: true })
    public tags?: string[]

    public static from(value: IIdentityAttributeQuery | IdentityAttributeQueryJSON): IdentityAttributeQuery {
        return this.fromAny(value)
    }

    public override toJSON(): IdentityAttributeQueryJSON {
        return super.toJSON() as IdentityAttributeQueryJSON
    }
}
