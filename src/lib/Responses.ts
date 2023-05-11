
export interface IMongoFindOneResponse<T>
{
    /**
     * The document that was found.
     */
    document: T;
}

export interface IMongoFindResponse<T>
{
    /**
     * The documents that were found.
     */
    documents: T[];
}

export interface IMongoInsertOneResponse
{
    /**
     * The identifier that was inserted.
     */
    insertedId: string;
}

export interface IMongoInsertManyResponse
{
    /**
     * The identifiers that were inserted.
     */
    insertedIds: string[];
}

export interface IMongoDeleteResponse
{
    /**
     * The number of documents that were deleted.
     */
    deletedCount: number;
}

export interface IMongoUpdateResponse
{
    /**
     * The number of documents that were matched.
     */
    matchedCount: number;
    /**
     * The number of documents that were modified.
     */
    modifiedCount: number;
    /**
     * The identifier of the document that was upserted.
     */
    upsertedId: string;
}

export interface IMongoReplaceResponse
{
    /**
     * The number of documents that were matched.
     */
    matchedCount: number;
    /**
     * The number of documents that were modified.
     */
    modifiedCount: number;
    /**
     * The identifier of the document that was upserted.
     */
    upsertedId: string;
}