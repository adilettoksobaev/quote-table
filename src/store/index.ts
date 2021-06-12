import { StateType } from 'typesafe-actions';
import rootReducer from './root-reducer';

import * as quotesActions from './quotes/actions';

export { default } from './store';
export { default as rootReducer } from './root-reducer';

export const actions = {
    quotes: quotesActions,
}

export type RootState = StateType<typeof rootReducer>;
