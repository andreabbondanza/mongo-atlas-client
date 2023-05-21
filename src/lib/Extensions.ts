import { ObjectId } from "mongodb";

/**
 * This is the object to be used when you want to use the ObjectId value in a query/filter.
 */
export class EObjectId
{
    $oid: string;
    public constructor(id: string | ObjectId)
    {
        if (typeof id === "string")
        {
            this.$oid = id;
        }
        else
        {
            this.$oid = id.toHexString();
        }
    }
}