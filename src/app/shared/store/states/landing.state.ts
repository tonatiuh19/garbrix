import { ContactInfoModel, LandingState } from '../../../app.model';

export const LANDING_FEATURE_KEY = 'landing';

export const initialLandingState: LandingState = {
  contactInfo: {} as ContactInfoModel,
  isSubmitting: false,
  isSubmitted: false,
  isError: false,
};
