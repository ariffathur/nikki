import { Text, View } from "react-native";
import { useTranslation } from "@/hooks/useTranslation";

export default function SettingScreen() {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t("setting.greeting")}</Text>
    </View>
  );
}
