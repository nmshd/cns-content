import { Serializable, serialize, type, validate } from "@js-soft/ts-serval"

export interface AuthorizationJSON {
    name: string
    value: string
}

export interface IAuthorization {
    name: string
    value: string
}

@type("Authorization")
export class Authorization extends Serializable implements IAuthorization {
    @validate()
    @serialize()
    public name: string

    @validate()
    @serialize()
    public value: string

    public static from(value: IAuthorization): Authorization {
        return super.from(value, Authorization) as Authorization
    }
}
