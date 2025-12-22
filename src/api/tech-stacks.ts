import type {
  CreateTechStackResponse,
  FetchTechStackResponse,
} from "@/api/response.type.ts";
import { api } from "@/api/index.ts";

export async function fetchTechStacks(
  keyword: string,
): Promise<FetchTechStackResponse> {
  const { data } = await api.get<FetchTechStackResponse>("/api/tech-stacks", {
    params: { keyword },
  });
  return data;
}

export async function createTechStacks(
  name: string,
): Promise<CreateTechStackResponse> {
  const { data } = await api.post<CreateTechStackResponse>("/api/tech-stacks", {
    name,
  });
  return data;
}
