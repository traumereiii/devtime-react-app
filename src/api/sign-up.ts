import { api } from "@/api/index.ts";
import type {
  CheckEmailResponse,
  CheckNicknameResponse,
  SignUpResponse,
} from "@/api/response.type.ts";
import type { SignUpRequest } from "@/api/request.type.ts";
import type { AxiosError } from "axios";

export async function checkEmail(email: string): Promise<boolean> {
  const { data } = await api.get<CheckEmailResponse>(
    "/api/signup/check-email",
    {
      params: { email },
    },
  );
  return data.available;
}

export async function checkNickname(nickname: string): Promise<boolean> {
  const { data } = await api.get<CheckNicknameResponse>(
    "/api/signup/check-nickname",
    {
      params: { nickname },
    },
  );
  return data.available;
}

export async function signUp(request: SignUpRequest) {
  try {
    const { data } = await api.post<SignUpResponse>("/api/signup", request);
    return data;
  } catch (e) {
    const axiosError = e as AxiosError;
    const response = axiosError.response?.data as SignUpResponse;
    return response;
  }
}
