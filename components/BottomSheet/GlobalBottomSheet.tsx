import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useBottomSheet } from "../../context/BottomSheetContext";

export const GlobalBottomSheet = () => {
  const { setBottomSheetRef, content, snapPoints, closeBottomSheet } =
    useBottomSheet();
  const theme = useTheme();

  const bottomSheetInternalRef = useRef<BottomSheet>(null);

  // We rely on content presence to open/close the sheet
  useEffect(() => {
    if (content) {
      // Content present -> Open
      // We snap to the first snap point (usually 0)
      bottomSheetInternalRef.current?.snapToIndex(0);
    } else {
      // Content removed -> Close
      bottomSheetInternalRef.current?.close();
    }
  }, [content]);

  // Ensure valid snap points
  const snapPointsMemo = useMemo(
    () => (snapPoints.length ? snapPoints : ["50%"]),
    [snapPoints],
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={closeBottomSheet}
      />
    ),
    [closeBottomSheet],
  );

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        closeBottomSheet();
      }
    },
    [closeBottomSheet],
  );

  return (
    <View
      style={[StyleSheet.absoluteFill, { zIndex: 9999 }]}
      pointerEvents="box-none"
    >
      <BottomSheet
        ref={bottomSheetInternalRef}
        index={-1} // Start closed
        snapPoints={snapPointsMemo}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.colors.surface }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.onSurfaceVariant,
        }}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={{ flex: 1, paddingBottom: 50 }}>
          {/* Render empty View when null to maintain tree but sheet will be closed */}
          {content ? content : <View />}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};
