# mongo-atlas-client

Find it on [NPM](https://www.npmjs.com/package/mongo-atlas-client)

## The need

I needed a simple way to interact with the [MongoDB Atlas DATA-API](https://www.mongodb.com/docs/atlas/api/data-api-resources/) using the apikey and using the mongodb types, with typescript. Additionally, I took the opportunity to learn how to publish pure ESM modules to npm.

## The data you need to use it

You'll forgive me if I'll assume you don't know how to use the data-api, but I'll assume you know how to use mongodb. If you don't, you can learn it [here](https://www.mongodb.com/try/download/community). When you create a project, you also create a cluster (datasource) and a database. After you've done this, you'll be able to enable the **data api** to use the database via https request instead the directly connection to the database. 

To enable the **data api** you have to click on the _DATA API_ item under the _SERVICES_ group in the left bar menu. Then, you need to click on the **Create API KEY** button. You'll be asked to give a name to the key and to confirm the creation. After you have to save your key somewhere safe, because you won't be able to see it again. You'll receive also the endpoint url, that you'll need to use the api.

So, the data you'll get and you'll need to use this library are:
- the **endpoint url**
- the **api key**
- the **datasource**
- the **database**

Connection data class
```typescript
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
```

## Dependency Injection

To allow to use your favorite http client library, when you initialize the _Client_ class, you can pass a callback that use your http client to make the request. The callback must return a string via promise that resolve to the response body. The callback will receive:
- the endpoint (url with the action);
- the body;
- the headers;
- the stringify function for with the EJSON support;
- the action (find, findOne, deleteOne, etc.)

Here the type request:

```typescript
export type Request = (url: string, body: any, headers: any, (obj: any) => EJSON.stringify(obj), action: Actions) => Promise<string>
```

TO the client you can also pass a log callback, if not, it will be used the console.log function

## Responses

The responses types are the same of the mongodb types from MongoDB [API responses](https://www.mongodb.com/docs/atlas/api/data-api-resources/), so you can use them directly in your code. 

```typescript

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
```

## Usage

The library usage is quiet simple. Check the following example:

```typescript

// example user type from user collection
class User
{
    public name: string;
    public surname: string
    public age: number;
    constructor(name: string, surname: string, age: number)
    {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
}


async function example()
{
    // set the connection data
    const connectionData: ConnectionData = new ConnectionData({
        dataSource: "source",
        database: "test",
        apikey: "1234567890",
        atlasEndPoint: "endpoint"
    });
    // set the request callback with got library
    const myRequest: Request = async (url: string, body: any, headers: any, stringify: (obj: any) => string, action: string) =>
    {
        const response = await got.post(url, { body: stringify(body), headers });
        return response.body;
    };
    // create the client
    const client = new Client(connectionData, myRequest);
    // find all users with age greater than 18
    const users = await client.find<User>("users", { age: { $gt: 18 } });
    if (users)
        for (const user of users.documents)
        {
            console.log(`${user.name} ${user.surname} is ${user.age} years old`)
        }
    // create a new user
    const userToAdd = new User("John", "Doe", 21);
    // insert the user
    const insertResponse = await client.insertOne<User>("users", userToAdd);
    if (insertResponse)
        console.log(`Added user with id: ${insertResponse.insertedId}`);

}
```

In this example you can see the use of the library. 
1. We start defining the *connection data*;
2. Then we define the request callback, that use the **got** library to make the request (but you can use whatever you want). 
3. Then we create the client and we use it to find all the users with age greater than 18.
4. Then we create a new user and we insert it in the database.

As you can see, the library support the MongoDB filters and for the response it use the MongoDB response types.


# NOTE ⚠️

This isn't a library for the API of **MONGO ATLAS Platform**, this library is for the **MONGO ATLAS DATA API**

