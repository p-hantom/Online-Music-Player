import { Action } from '@ngrx/store';

export enum HotActionTypes {
  LoadHotData = '[Hot API] Load Data',
  
  
}

export class LoadHotData implements Action {
  readonly type = HotActionTypes.LoadHotData;
}


// export type HotActions = LoadHots;
