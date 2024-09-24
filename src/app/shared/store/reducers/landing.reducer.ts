import { Action, createReducer, on } from '@ngrx/store';
import {
  initialLandingState,
  LANDING_FEATURE_KEY,
} from '../states/landing.state';
import { LandingActions } from '../actions';
import { createRehydrateReducer } from '../../utils/rehydrate-reducer';
import { LandingState } from '../../../app.model';

export const LandingReducer = createRehydrateReducer(
  { key: LANDING_FEATURE_KEY },
  initialLandingState,

  on(
    LandingActions.sendContactInfo,
    (state: LandingState, { contactInfo }: any) => {
      return {
        ...state,
        isSubmitting: true,
      };
    }
  ),
  on(
    LandingActions.sendContactInfoSuccess,
    (state: LandingState, { contactResponse }: any) => {
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
      };
    }
  ),
  on(
    LandingActions.sendContactInfoFailure,
    (state: LandingState, { errorResponse }: any) => {
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
      };
    }
  ),
  on(
    LandingActions.resetContactInfoState,
    (state: LandingState, { contactResponse }: any) => {
      return {
        ...state,
        contactInfo: {} as any,
        isSubmitting: false,
        isSubmitted: false,
        isError: false,
      };
    }
  )
);
