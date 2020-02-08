import { Action } from '@ngrx/store';

export enum TopListActionTypes {
  LoadData = '[TopList Page] Load Data',
  LoadSuccess = '[TopList API] Data Loaded Success',
  LoadError = '[TopList Page] Load Error',
  
  LoadAllListsData = '[TopList Page] Load All Lists Data',
  LoadAllListsSuccess = '[TopList API] All Lists Data Loaded Success',
  LoadAllListsError = '[TopList Page] All Lists Load Error',
}

export class LoadTopListData implements Action {
  readonly type = TopListActionTypes.LoadData;
  constructor(public index: number) { }
}

export class LoadTopListSuccess implements Action {
  readonly type = TopListActionTypes.LoadSuccess;
}

export class LoadTopListError implements Action {
  readonly type = TopListActionTypes.LoadError;
  constructor(public data: any) { }
}

//-----------------all lists
export class LoadAllListsData implements Action {
  readonly type = TopListActionTypes.LoadAllListsData;
}

export class LoadAllListsSuccess implements Action {
  readonly type = TopListActionTypes.LoadAllListsSuccess;
}

export class LoadAllListsError implements Action {
  readonly type = TopListActionTypes.LoadAllListsError;
  constructor(public data: any) { }
}

// export type ListActions = LoadLists;
