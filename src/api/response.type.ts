export interface CheckEmailResponse {
  success: boolean;
  available: boolean;
  message: string;
}

export interface CheckNicknameResponse {
  success: boolean;
  available: boolean;
  message: string;
}

export interface CommonResponse {
  success: boolean;
  error?: {
    message: string;
    statusCode: number;
  };
}

export interface SignUpResponse extends CommonResponse {
  message: string;
}

export interface LoginResponse extends CommonResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  isFirstLogin: boolean;
  isDuplicateLogin: boolean;
}
