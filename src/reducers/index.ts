//https://levelup.gitconnected.com/set-up-a-typescript-react-redux-project-35d65f14b869
import { combineReducers } from 'redux';
import { productsReducer } from './product/ProductReduce';
import { ListModeReducer } from './listMode/ListModeReduce';

export const rootReducer = combineReducers({
    store: productsReducer,
    listMode: ListModeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;