import { Actions } from "./Actions.js";

export type Request = (url: string, body: any, headers: any, stringify: (obj: any) => string, action: Actions) => Promise<string>
