import { combine, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

// type OpenState = {
//   open: true;
//   title: string;
//   body?: string;
//   onPositive: {
//     label: string;
//     onClick: () => void;
//   };
//   onNegative?: {
//     label: string;
//     onClick: () => void;
//   };
// };
//
// type CloseState = {
//   open: false;
// };
//
// type State = OpenState | CloseState;

type State = {
  open: boolean;
  title: string;
  body?: string;
  onPositive: {
    label: string;
    onClick: () => void;
  };
  onNegative?: {
    label: string;
    onClick: () => void;
  };
};

const initialState: State = {
  open: false,
  title: "",
  body: "",
  onPositive: {
    label: "",
    onClick: () => {},
  },
  // onNegative: {
  //   label: "",
  //   onClick: () => {},
  // },
};

export const useDialogStore = create(
  devtools(
    immer(
      combine(initialState, (set) => ({
        actions: {
          open: (state: Omit<State, "open">) => {
            console.log("check actions open");
            set({ ...state, open: true });
          },
          close: () => {
            set({ open: false });
          },
        },
      })), // end of combine
    ), // end of immer
  ), // end of devtools
);

export const useDialog = () => {
  const store = useDialogStore();
  return store as typeof store & State;
};

export const useOpenDialog = () =>
  useDialogStore((state) => state.actions.open);
export const useCloseDialog = () =>
  useDialogStore((state) => state.actions.close);
