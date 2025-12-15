import { createContext, useContext } from "react";

type TextFieldContextType = {
  value: string;
  setValue: (value: string) => void;
};

export const TextFieldContext = createContext<TextFieldContextType | null>(
  null,
);

export const useTextFieldContext = () => {
  const context = useContext(TextFieldContext);
  if (!context) {
    throw new Error("TextFieldContext is not provided");
  }
  return context;
};
