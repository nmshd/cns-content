import { ContentJSON } from "../../ContentJSON"
import { ResponseItemStatus } from "./ResponseItemStatus"

export interface ResponseJSON extends ContentJSON {
    requestId: string
    items: (ResponseItemGroupJSON | ResponseItemJSON)[]
}

export interface ResponseItemJSON extends ContentJSON {
    status: ResponseItemStatus
    content?: AcceptContentJSON | RejectContentJSON | ErrorContentJSON
    metadata?: object
}

export interface ResponseItemGroupJSON extends ContentJSON {
    items: ResponseItemJSON[]
    metadata?: object
}

export interface AcceptContentJSON extends ContentJSON {}

export interface RejectContentJSON extends ContentJSON {
    code?: string
    message?: string
}

export interface ErrorContentJSON extends ContentJSON {
    code: string
    message: string
}
