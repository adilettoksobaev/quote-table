import { QuotesActions } from "./actions";
import { QuotesActionTypes, QuotesState } from './types';
import { Reducer } from "redux";

const defaultState: QuotesState = {
    isAuthorized: false,
};

export const quotesReducer: Reducer<QuotesState, QuotesActions> = (
    state = defaultState,
    action) => {
    switch (action.type) {
        case QuotesActionTypes.IS_AUTHORIZED:
            return {
                ...state,
                isAuthorized: action.isAuthorized,
            };
        default:
            return state;
    }
};
export default quotesReducer;