import { createAction, props } from '@ngrx/store';

const actor = '[Landing]';

export const sendContactInfo = createAction(
  `${actor} Send Contact Info`,
  props<{ contactInfo: any }>()
);

export const sendContactInfoSuccess = createAction(
  `${actor} Send Contact Info Success`,
  props<{ contactResponse: any }>()
);

export const sendContactInfoFailure = createAction(
  `${actor} Send Contact Info Failure`,
  props<{ errorResponse: any }>()
);

export const resetContactInfoState = createAction(
  `${actor} Reset Contact Info State`
);
