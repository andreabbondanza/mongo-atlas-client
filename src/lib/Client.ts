import { Filter, UpdateFilter } from "mongodb";
import { Actions } from "./Actions.js";
import { Query } from "./Query.js";
import { ConnectionData } from "./ConnectionData.js";
import { Request } from "./Request.js";
import { IMongoFindOneResponse, IMongoFindResponse, IMongoInsertOneResponse, IMongoInsertManyResponse, IMongoDeleteResponse, IMongoUpdateResponse, IMongoReplaceResponse } from "./Responses.js";
import { IQueryOptions } from "./IQueryOptions.js";

export class Client
{
    private _atlasEndpoint: string;
    private _apiKey: string;
    private _database: string;
    private _dataSource: string;
    private _request: Request;
    private _log?: (message: string) => void;

    private getHeaders(): any
    {
        return {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': this._apiKey,
        }
    }

    private getActionUrl(action: Actions): string
    {
        return this._atlasEndpoint + "/action/" + action;
    }
    /**
     * find a single document
     * @param collection collection name
     * @param filter filter
     * @param options options
     * @returns 
     */
    public async findOne<T>(collection: string, filter: Filter<T>, options?: IQueryOptions): Promise<IMongoFindOneResponse<T> | null>
    {
        let result: IMongoFindOneResponse<T> | null = null;
        try
        {
            const body = new Query<T>({ dataSource: this._dataSource, database: this._database, collection });
            body.filter = filter;
            if (options)
            {
                if (options.sort) body.sort = options.sort;
                if (options.limit) body.limit = options.limit;
                if (options.skip) body.skip = options.skip;
                if (options.projection) body.projection = options.projection;
            }
            const response = await this._request(this.getActionUrl("findOne"), body, this.getHeaders(), "findOne");
            result = JSON.parse(response) as IMongoFindOneResponse<T>;
        }
        catch (error)
        {
            if (this._log) this._log((error as any).message);
            else console.log((error as any).message);
        }
        return result;
    }

    /**
     * find multiple documents
     * @param collection collection name
     * @param filter filter
     * @param options options
     * @returns 
     */
    public async find<T>(collection: string, filter: Filter<T>, options?: IQueryOptions): Promise<IMongoFindResponse<T> | null>
    {
        let result: IMongoFindResponse<T> | null = null;
        try
        {
            const body = new Query<T>({ dataSource: this._dataSource, database: this._database, collection });
            body.filter = filter;
            if (options)
            {
                if (options.sort) body.sort = options.sort;
                if (options.limit) body.limit = options.limit;
                if (options.skip) body.skip = options.skip;
                if (options.projection) body.projection = options.projection;
            }
            const response = await this._request    (this.getActionUrl("find"), body, this.getHeaders(), "find");
            result = JSON.parse(response) as IMongoFindResponse<T>;
        }
        catch (error)
        {
            if (this._log) this._log((error as any).message);
            else console.log((error as any).message);
        }
        return result;
    }

    /**
     * insert a single document
     * @param collection collection name
     * @param document document
     * @returns 
     */
    public async insertOne<T>(collection: string, document: T): Promise<IMongoInsertOneResponse | null>
    {
        let result: IMongoInsertOneResponse | null = null;
        try
        {
            const body = new Query<T>({ dataSource: this._dataSource, database: this._database, collection });
            body.document = document;
            const response = await this._request(this.getActionUrl("insertOne"), body, this.getHeaders(),"insertOne");
            result = JSON.parse(response) as IMongoInsertOneResponse;
        }
        catch (error)
        {
            if (this._log) this._log((error as any).message);
            else console.log((error as any).message);
        }
        return result;
    }
    /**
     * insert multiple documents
     * @param collection collection name
     * @param documents documents 
     * @returns 
     */
    public async insertMany<T>(collection: string, documents: T[]): Promise<IMongoInsertManyResponse | null>
    {
        let result: IMongoInsertManyResponse | null= null;
        try
        {
            const body = new Query<T>({ dataSource: this._dataSource, database: this._database, collection });
            body.documents = documents;
            const response = await this._request(this.getActionUrl("insertMany"), body, this.getHeaders(), "insertMany");
            result = JSON.parse(response) as IMongoInsertManyResponse;
        }
        catch (error)
        {
            if (this._log) this._log((error as any).message);
            else console.log((error as any).message);
        }
        return result;
    }
    /**
     * delete single document
     * @param collection collection name
     * @param filter filter 
     * @returns 
     */
    public async deleteOne<T>(collection: string, filter: Filter<T>): Promise<IMongoDeleteResponse | null>
    {
        let result: IMongoDeleteResponse | null = null;
        try
        {
            const body = new Query<T>({ dataSource: this._dataSource, database: this._database, collection });
            body.filter = filter;
            const response = await this._request(this.getActionUrl("deleteOne"), body, this.getHeaders(), "deleteOne");
            result = JSON.parse(response) as IMongoDeleteResponse;
        }
        catch (error)
        {
            if (this._log) this._log((error as any).message);
            else console.log((error as any).message);
        }
        return result;
    }
    /**
     * delete multiple documents
     * @param collection collection name
     * @param filter filter
     * @returns 
     */
    public async deleteMany<T>(collection: string, filter: Filter<T>): Promise<IMongoDeleteResponse | null>
    {
        let result: IMongoDeleteResponse | null = null;
        try
        {
            const body = new Query<T>({ dataSource: this._dataSource, database: this._database, collection });
            body.filter = filter;
            const response = await this._request(this.getActionUrl("deleteMany"), body, this.getHeaders(), "deleteMany");
            result = JSON.parse(response) as IMongoDeleteResponse;
        }
        catch (error)
        {
            if (this._log) this._log((error as any).message);
            else console.log((error as any).message);
        }
        return result;
    }
    /**
     * update a single document
     * @param collection collection name
     * @param filter filter
     * @param update update filter
     * @param upsert upsert
     * @returns 
     */
    public async updateOne<T>(collection: string, filter: Filter<T>, update: UpdateFilter<T>, upsert: boolean = false): Promise<IMongoUpdateResponse | null>
    {
        let result: IMongoUpdateResponse | null = null;
        try
        {
            const body = new Query<T>({ dataSource: this._dataSource, database: this._database, collection });
            body.filter = filter;
            body.updateFilter = update;
            body.upsert = upsert;
            const response = await this._request(this.getActionUrl("updateOne"), body, this.getHeaders(), "updateOne");
            result = JSON.parse(response) as IMongoUpdateResponse;
        }
        catch (error)
        {
            if (this._log) this._log((error as any).message);
            else console.log((error as any).message);
        }
        return result;
    }
    /**
     * update multiple documents
     * @param collection collection name
     * @param filter filter
     * @param update update filter
     * @param upsert upsert
     * @returns 
     */
    public async updateMany<T>(collection: string, filter: Filter<T>, update: UpdateFilter<T>, upsert: boolean = false): Promise<IMongoUpdateResponse | null>
    {
        let result: IMongoUpdateResponse | null = null;
        try
        {
            const body = new Query<T>({ dataSource: this._dataSource, database: this._database, collection });
            body.filter = filter;
            body.updateFilter = update;
            body.upsert = upsert;
            const response = await this._request(this.getActionUrl("updateMany"), body, this.getHeaders(), "updateMany");
            result = JSON.parse(response) as IMongoUpdateResponse;
        }
        catch (error)
        {
            if (this._log) this._log((error as any).message);
            else console.log((error as any).message);
        }
        return result;
    }
    /**
     * replace a document
     * @param collection collection name 
     * @param filter filter
     * @param data replacement data
     * @param upsert upsert
     * @returns 
     */
    public async replaceOne<T>(collection: string, filter: Filter<T>, data: T, upsert: boolean = false): Promise<IMongoReplaceResponse | null>
    {
        let result: IMongoReplaceResponse | null = null;
        try
        {
            const body = new Query<T>({ dataSource: this._dataSource, database: this._database, collection });
            body.filter = filter;
            body.replacement = data;
            body.upsert = upsert;
            const response = await this._request(this.getActionUrl("replaceOne"), body, this.getHeaders(), "replaceOne");
            result = JSON.parse(response) as IMongoReplaceResponse;
        }
        catch (error)
        {
            if (this._log) this._log((error as any).message);
            else console.log((error as any).message);
        }
        return result;
    }

    /**
     * Constructor of the Client
     * @param cData the connection data with the api key, database/datasource and atlas endpoint
     * @param request the request handler
     * @param log optional log function, if not passed console.log will be used
     */
    public constructor(cData: ConnectionData, request: Request, log?: (message: string) => void)
    {
        this._atlasEndpoint = cData.atlasEndPoint;
        this._apiKey = cData.apikey;
        this._database = cData.database;
        this._dataSource = cData.dataSource;
        this._log = log;
        this._request = request;
    }
}