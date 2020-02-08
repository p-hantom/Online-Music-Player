import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, merge } from 'rxjs';
import { TopListActionTypes, LoadTopListError, LoadAllListsError } from '../actions/list.actions';
import { ListService } from 'src/app/services/list.service';


@Injectable()
export class ListEffects {

  @Effect()
  loadListData$ = this.actions$
    .pipe(
      ofType(TopListActionTypes.LoadData),
      mergeMap((data) => this.listService.topList(data)
          .pipe(
            map(data => ({ type: '[TopList API] Data Loaded Success', payload: data })),
            catchError((err) => {
              //call the action if there is an error
              return of(new LoadTopListError(err["message"]));
            })
          ))
    )

  @Effect()
  loadAllListsData$ = this.actions$
    .pipe(
      ofType(TopListActionTypes.LoadAllListsData),
      mergeMap(() => this.listService.topListAll()
        .pipe(
          map(data => ({ type: '[TopList API] All Lists Data Loaded Success', payload: data})),
          catchError((err) => {
            //call the action if there is an error
            return of(new LoadAllListsError(err["message"]));
          })
        ))
    )

  constructor(
    private actions$: Actions,
    private listService: ListService
  ) { }

}
