import { useTranslation } from "@/hooks/useTranslation";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const { t } = useTranslation();
  return (
    <View>
      <Text>{t("home.title")}</Text>
    </View>
  );
}
