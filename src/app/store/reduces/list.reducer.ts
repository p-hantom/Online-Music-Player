import { Action } from '@ngrx/store';
import { TopListActionTypes } from '../actions/list.actions'

export const listFeatureKey = 'list';

export interface TopListAction extends Action {
  payload: any
}

export interface TopListState {
  loading?: boolean,
  topList: Array<any>,
  totalData: Array<any>,
  index?: number,
  size?: number,
  total?: number
}

export const initialState: TopListState = {
  topList: [],
  totalData: [],
  index: 1,
  size: 10,
  total: 0
};

//--------all top lists
export interface AllTopListsState{
  topList: Array<any>
}

export const allListsInitialState: AllTopListsState = {
  topList: []
}


export function topListReducer(state: TopListState = initialState, action: TopListAction): TopListState {
  switch (action.type) {
    case TopListActionTypes.LoadData:
      return state;
    case TopListActionTypes.LoadSuccess:
      state.totalData = action.payload.playlist.tracks;
      state.topList = (action.payload.playlist.tracks || []).slice(state.index - 1, state.index * state.size);
      state.total = Math.ceil(action.payload.playlist.tracks.length / state.size)
      // state.index = action.payload.
      return state;
    case TopListActionTypes.LoadError:
      return state;
    default:
      return state;
  }
}

export function allTopListReducer(state: AllTopListsState = allListsInitialState, action: TopListAction): AllTopListsState {
  switch (action.type) {
    case TopListActionTypes.LoadAllListsData:
      return state;
    case TopListActionTypes.LoadAllListsSuccess:
      state.topList = action.payload.list.slice(0,8);
      return state;
    case TopListActionTypes.LoadAllListsError:
      return state;
    default:
      return state;
  }
}
