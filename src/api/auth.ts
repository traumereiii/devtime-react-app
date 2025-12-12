import { api } from "@/api/index.ts";
import type { LoginResponse } from "@/api/response.type.ts";
import type { LoginRequest } from "@/api/request.type.ts";
import type { AxiosError } from "axios";

export async function login(request: LoginRequest): Promise<LoginResponse> {
  try {
    const { data } = await api.post<LoginResponse>("/api/auth/login", request);
    return data;
  } catch (e) {
    const axiosError = e as AxiosError;
    return axiosError.response?.data as LoginResponse;
  }
}
