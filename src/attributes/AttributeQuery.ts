export interface IAttributeQuery {
    attributeType: string
    tags: string[]
}

export interface IAttributeQueryContainer {
    query: IAttributeQuery
    filterValid: boolean
    userText: string
}
