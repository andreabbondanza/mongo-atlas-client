import { Filter, UpdateFilter } from "mongodb";

export class Query<T>
{
    /**
     * The atlas data source, should be the cluster.
     */
    public dataSource: string;
    /**
     * The database to query.
     */
    public database: string;
    /**
     * The collection to query.
     */
    public collection: string;
    /**
     * 
     */
    public filter?: Filter<T>;
    /**
     * the filter to update
     */
    public updateFilter?: UpdateFilter<T>;
    /**
     * upsert the document if it does not exist
     */
    public upsert?: boolean;
    /**
     * replacement document
     */
    public replacement?: T;
    /**
     * projection document
     */
    public projection: any;
    /**
     * sort document
     */
    public sort?: string;
    /**
     * limit document
     */
    public limit?: number;
    /**
     * skip document
     */
    public skip?: number;
    /**
     * The document to insert.
     */
    public document?: T;
    /**
     * The documents to insert.
     */
    public documents?: T[];

    /**
     * Constructor
     * @param config the configuration for the query 
     */
    public constructor(config: { dataSource: string, database: string, collection: string})
    {
        this.dataSource = config.dataSource;
        this.database = config.database;
        this.collection = config.collection;
    }

}