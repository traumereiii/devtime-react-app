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

export interface UserProfile {
  email: string;
  nickname: string;
  profile?: {
    career: string;
    purpose: string;
    goal: string;
    techStacks: string[];
    profileImage?: string;
  };
}
