import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ControlService } from '../../services/control.service';
import { ControlActionTypes, ControlError } from '../actions';



@Injectable()
export class ControlEffects {
  @Effect()
  loadSongUrl$ = this.actions$
    .pipe(
      ofType(ControlActionTypes.LoadSongUrl),
      mergeMap((data) => this.controlService.getSongUrl(data)
          .pipe(
            map(data => {
              return ({ type: ControlActionTypes.LoadSongUrlSuccess, payload: data })
            }),
            catchError((err) => {
              //call the action if there is an error
              console.log("load song error!")
              return of(new ControlError(err["message"]));
            })
          ))
    )


    constructor(
      private actions$: Actions, 
      private controlService: ControlService
    ) { }

}
