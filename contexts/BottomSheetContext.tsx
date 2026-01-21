import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

interface BottomSheetContextType {
  openBottomSheet: (content: React.ReactNode, snapPoints?: string[]) => void;
  closeBottomSheet: () => void;
  setBottomSheetRef: (ref: any) => void; // Relaxed type to accept BottomSheet or BottomSheetModal
  content: React.ReactNode | null;
  snapPoints: string[];
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
);

export const BottomSheetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [snapPoints, setSnapPoints] = useState<string[]>(["50%"]);
  // We keep the ref locally but don't strictly use it for imperative calls anymore
  // as GlobalBottomSheet reacts to 'content' state.
  const bottomSheetRef = useRef<any>(null);

  const setRef = useCallback((ref: any) => {
    bottomSheetRef.current = ref;
  }, []);

  const openBottomSheet = useCallback(
    (newContent: React.ReactNode, newSnapPoints: string[] = ["50%"]) => {
      setContent(newContent);
      setSnapPoints(newSnapPoints);
    },
    [],
  );

  const closeBottomSheet = useCallback(() => {
    // We clear content to trigger the effect in GlobalBottomSheet
    setContent(null);
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
        setBottomSheetRef: setRef,
        content,
        snapPoints,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};
