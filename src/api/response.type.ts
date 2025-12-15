export interface CheckEmailResponse {
  success: true;
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

export interface ErrorResponse {
  success: false;
  error: {
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

export interface FetchTechStackResponse {
  results: TechStack[];
}

export interface TechStack {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTechStackResponse {
  message: string;
  techStack: TechStack;
}
