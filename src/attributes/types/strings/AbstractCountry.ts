import { serialize, validate } from "@js-soft/ts-serval"
import { AbstractString } from "../AbstractString"

export abstract class AbstractCountry extends AbstractString {
    @serialize()
    @validate()
    public override value: string
}
