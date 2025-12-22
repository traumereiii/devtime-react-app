export type ValidationItem = {
  type: "informative" | "positive" | "negative";
  message: string;
  status: boolean;
  checked: boolean;
  focus: boolean;
};

export type ValidationState = Record<string, ValidationItem>;

export type UseMutationCallback<R> = {
  onSuccess?: (res: R) => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};
