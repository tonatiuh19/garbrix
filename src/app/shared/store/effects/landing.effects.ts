import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { LandingActions } from '../actions';
import { LandingService } from '../../services/landing.service';

@Injectable()
export class LandingEffects {
  paying$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.sendContactInfo),
      switchMap(({ contactInfo }) => {
        return this.landingService
          .sendContactInfo(
            contactInfo.name,
            contactInfo.email,
            contactInfo.phone,
            contactInfo.businessType,
            contactInfo.message
          )
          .pipe(
            map((response) => {
              return LandingActions.sendContactInfoSuccess({
                contactResponse: response,
              });
            }),
            catchError((error) => {
              return of(
                LandingActions.sendContactInfoFailure({ errorResponse: error })
              );
            })
          );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private landingService: LandingService
  ) {}
}
