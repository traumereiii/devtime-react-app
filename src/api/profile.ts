import { api } from "@/api/index.ts";
import type { CommonResponse } from "@/api/response.type.ts";
import type { UpdateProfile } from "@/api/request.type.ts";

export async function updateProfile(
  request: UpdateProfile,
): Promise<CommonResponse> {
  const { data } = await api.put<CommonResponse>("/api/profile", request);
  return data;
}
