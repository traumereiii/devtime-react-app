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
  message?: string;
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
