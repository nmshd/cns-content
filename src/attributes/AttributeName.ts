import { Serializable, type } from "@js-soft/ts-serval"

export interface IAttributeName {
    name: string
}

@type("AttributeName")
export class AttributeName extends Serializable implements IAttributeName {
    public set name(value: string) {
        this.checkName(value)
        this._name = value
    }
    public get name(): string {
        return this._name
    }
    protected _name: string

    public constructor(name: string) {
        super()
        this.checkName(name)
        this._name = name
    }

    protected checkName(name: string, throwError = true): Error | null {
        let err
        if (!name) {
            err = new Error("error.content.attribute.nameMustBeSet")
        }
        if (err && throwError) {
            throw err
        }
        return null
    }

    public static from(value: any): AttributeName {
        if (typeof value === "string") {
            return new AttributeName(value)
        }

        return new AttributeName(value.name)
    }

    public static deserialize(value: string): AttributeName {
        return new AttributeName(value)
    }

    public toString(): string {
        return this._name
    }
    public serialize(): string {
        return this._name
    }
    public toJSON(): string {
        return this._name
    }
}
