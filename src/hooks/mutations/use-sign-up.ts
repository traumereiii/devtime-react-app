import { useMutation } from "@tanstack/react-query";
import type { UseMutationCallback } from "@/types.ts";
import { signUp } from "@/api/sign-up.ts";

export function useSignUp(
  callbacks?: UseMutationCallback<Awaited<ReturnType<typeof signUp>>>,
) {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (res) => {
      if (callbacks?.onSuccess) callbacks.onSuccess(res);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
