import { 
    QuotesActionTypes, IAuthorizedAction, 
} from './types';


export type QuotesActions =
    | IAuthorizedAction;

export function isAuthorizedAction(isAuthorized: boolean) {
    const action: IAuthorizedAction = {
        type: QuotesActionTypes.IS_AUTHORIZED,
        isAuthorized
    }
    return action;
}