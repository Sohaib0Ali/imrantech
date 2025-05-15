
import * as React from "react";
import {
  type ToastActionElement,
  type ToastProps as ToastPrimitiveProps,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "@/components/ui/toast";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;

type ToastProps = ToastPrimitiveProps & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive" | "success";
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToastProps;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToastProps>;
      id: string;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      id?: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      id: string;
    };

interface State {
  toasts: ToastProps[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { id } = action;

      if (id) {
        if (toastTimeouts.has(id)) {
          clearTimeout(toastTimeouts.get(id));
          toastTimeouts.delete(id);
        }

        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === id
              ? {
                  ...t,
                  open: false,
                }
              : t
          ),
        };
      }

      return {
        ...state,
        toasts: state.toasts.map((t) => ({
          ...t,
          open: false,
        })),
      };
    }

    case "REMOVE_TOAST":
      if (toastTimeouts.has(action.id)) {
        clearTimeout(toastTimeouts.get(action.id));
        toastTimeouts.delete(action.id);
      }

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };

    default:
      return state;
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

interface Toast extends Omit<ToastProps, "id"> {
  id?: string;
}

function toast({ variant = "default", ...props }: Toast) {
  const id = props.id || genId();

  const update = (props: ToastProps) =>
    dispatch({
      type: "UPDATE_TOAST",
      id,
      toast: props,
    });

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) {
          dismiss();
        }
      },
      className: `border-2 ${variant === "destructive" ? "border-destructive/20" : variant === "success" ? "border-green-600/20" : "border-primary/20"} shadow-lg ${props.className || ""}`,
    },
  });

  // Set timeout to automatically dismiss toast
  if (!toastTimeouts.has(id)) {
    toastTimeouts.set(
      id,
      setTimeout(() => {
        dispatch({ type: "DISMISS_TOAST", id });

        setTimeout(() => {
          dispatch({ type: "REMOVE_TOAST", id });
        }, 300); // Animation duration
      }, TOAST_REMOVE_DELAY)
    );
  }

  return {
    id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", id: toastId }),
  };
}

export { useToast, toast, ToastActionElement, type ToastProps };
export default { useToast, toast };
