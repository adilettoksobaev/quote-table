import { Action } from "typesafe-actions"

export interface QuotesState {
    isAuthorized: boolean;
}

export enum QuotesActionTypes {
    IS_AUTHORIZED = 'IS_AUTHORIZED',
}

export interface IAuthorizedAction extends Action<QuotesActionTypes.IS_AUTHORIZED> {
    isAuthorized: boolean
}