import { Actions } from "./Actions.js";
import { Query } from "./Query.js";

/**
 * IRequest interface
 */
export interface IRequest
{
    request<T>(url: string, body: Query<T>, headers: any, action: Actions): Promise<string>;
} 