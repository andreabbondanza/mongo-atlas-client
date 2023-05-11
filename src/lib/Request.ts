import { Actions } from "./Actions.js";

export type Request = (url: string, body: any, headers: any, action: Actions) => Promise<string>
