import { useMutation } from "@tanstack/react-query";
import type { UseMutationCallback } from "@/types.ts";
import { login } from "@/api/auth.ts";

export function useLogin(
  callbacks?: UseMutationCallback<Awaited<ReturnType<typeof login>>>,
) {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
