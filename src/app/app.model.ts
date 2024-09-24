//export const DOMAIN = 'http://localhost:8015/api';
export const DOMAIN = 'https://garbrix.com/dev/api';

export interface LandingState {
  contactInfo: ContactInfoModel;
  isSubmitting?: boolean;
  isSubmitted?: boolean;
  isError?: boolean;
}

export interface ContactInfoModel {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  message: string;
}
