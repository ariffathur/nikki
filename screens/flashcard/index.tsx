import { Text, View } from "react-native";
import { useTranslation } from "@/hooks/useTranslation";

export default function FlashcardScreen() {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t("flashcard.greeting")}</Text>
    </View>
  );
}
