export interface UsernameAndPassword {
    username: string,
    password: string
}

export interface ApiToken {
    token: string,
}

export interface Collections {
    collections: CollectionAndName[],
    count: number,
    totalCount: number
}

export interface CollectionAndName {
    id: number,
    name: string
}

export interface Collection {
    id: number,
    userId: number,
    name: string,
    cards: CardInCollection[]
}

export interface CardInCollection {
    id: number,
    name: string,
    count: number
}

export interface Card {
    id: number,
    name: string,
    imageUrl: string
}