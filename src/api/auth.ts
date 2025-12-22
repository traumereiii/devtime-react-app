import { api } from "@/api/index.ts";
import type { LoginResponse } from "@/api/response.type.ts";
import type { LoginRequest } from "@/api/request.type.ts";

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/api/auth/login", request);
  return data;
}
