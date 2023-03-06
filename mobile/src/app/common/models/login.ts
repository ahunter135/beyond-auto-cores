export type AuthenticateRequest = SimpleAuthenticateRequest;
export type AuthenticateResponse = AuthenticateToken;
export interface SimpleAuthenticateRequest {
  userName: string;
  password: string;
  validateSubscription?: boolean;
}

export interface RefreshAuthRequest {
  refreshToken: string;
}

export interface AuthenticateToken {
  accessToken: string;
  refreshToken: string;
}

export type LoginResponse = null;

export interface ResetPasswordRequest {
  email: string;
  password: string;
}

export interface UpdatePasswordRequest {
  id: number;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
