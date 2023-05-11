/**
 * ConnectionData class
 */
export class ConnectionData
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
     * The api key to use.
     */
    public apikey: string;
    /**
     * The atlas end point to use.
     */
    public atlasEndPoint: string;

    /**
     * Constructor
     * @param config the configuration for the query
     */
    constructor(config: { dataSource: string, database: string, apikey: string, atlasEndPoint: string}) {
        this.dataSource = config.dataSource;
        this.database = config.database;
        this.apikey = config.apikey;
        this.atlasEndPoint = config.atlasEndPoint;
    }
}