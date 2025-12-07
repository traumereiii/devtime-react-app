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

export interface SignUpResponse {
  success: boolean;
  message: string;
  error?: {
    message: string;
    statusCode: number;
  };
}
