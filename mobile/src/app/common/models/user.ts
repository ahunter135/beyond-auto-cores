export interface User extends SubscriptionLevelPermission {
  userName: string;
  firstName: string;
  lastName: string;
  contactNo: string;
  email: string;
  company: any;
  resetPasswordCode: any;
  role: number;
  subscription: number;
  tier: number;
  tier1AdminEnabled: boolean;
  tier1PercentLevel: number;
  tier1UserEnabled: boolean;
  margin: number;
  photo: string;
  photoFileKey: string;
  fileUrl: string;
  id: number;
  isDeleted: boolean;
  createdBy: number;
  createdOn: string;
  updatedBy: number;
  updatedOn: string;
  success: boolean;
  message: string;
  affiliateLink?: string;
  gradeCredits: number;
  affiliateEnable: boolean;
  uuid: string;
}

export interface UpdateUserRequest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  subscription: number;
  role: number;
  tier?: number;
  margin?: number;
  isUpdatePhoto?: boolean;
  formData?: any;
  tier1AdminEnabled: boolean;
  tier1PercentLevel: number;
  tier1UserEnabled: boolean;
}

export interface UpdateUserTierRequest {
  id: number;
  tier1AdminEnabled: boolean;
  tier1UserEnabled: boolean;
}

export interface UpdateUserMarginRequest {
  id: number;
  margin: number;
}

export enum SubscriptionLevel {
  premium = 1,
  elite = 2,
  lifetime = 3,
}

export interface SubscriptionLevelPermission {
  subscriptionName: string;
  level: number;
  canInvoice: boolean;
  canMargin: boolean;
}
