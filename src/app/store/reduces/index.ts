// import { topListReducer, TopListState } from './list.reducer';
import * as fromTopList from './list.reducer'
import * as fromControl from './control.reducer'
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

export interface State{
    topListStore: fromTopList.TopListState;
    allTopListStore: fromTopList.AllTopListsState;
    controlStore: fromControl.ControlState;
}

export const reducers: ActionReducerMap<State> = {
    topListStore: fromTopList.topListReducer,
    allTopListStore: fromTopList.allTopListReducer,
    controlStore: fromControl.controlReducer,
}