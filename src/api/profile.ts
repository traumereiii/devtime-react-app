import { api } from "@/api/index.ts";
import type { CommonResponse } from "@/api/response.type.ts";
import type { CreateProfile, UpdateProfile } from "@/api/request.type.ts";

export async function createProfile(
  request: CreateProfile,
): Promise<CommonResponse> {
  const { data } = await api.post<CommonResponse>("/api/profile", request);
  return data;
}

export async function updateProfile(
  request: UpdateProfile,
): Promise<CommonResponse> {
  const { data } = await api.put<CommonResponse>("/api/profile", request);
  return data;
}
