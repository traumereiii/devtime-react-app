import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query-key.ts";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "@/api/response.type.ts";
import type { UserProfile } from "@/types.ts";
import { fetchUserProfile } from "@/api/profile.ts";

export function useUserProfile() {
  return useQuery<UserProfile, AxiosError<ErrorResponse>>({
    queryKey: QUERY_KEYS.profile,
    queryFn: fetchUserProfile,
    enabled: false,
    retry: false,
    staleTime: 0, // ✅ 항상 stale -> refetch 시 항상 네트워크로
    gcTime: 0, // ✅ 사용 안 하면 즉시 GC 대상(캐시 거의 남지 않게)
  });
}
