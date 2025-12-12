export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateProfile {
  career: string;
  purpose: string;
  goal: string;
  techStacks: string[];
  profileImage: string;
}
