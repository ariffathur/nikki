import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

import en from "./translations/en.json";
import id from "./translations/id.json";

const i18n = new I18n({
  en,
  id,
});

// ambil bahasa device
i18n.locale = Localization.getLocales()[0].languageCode as string;

// fallback kalau bahasa tidak tersedia
i18n.enableFallback = true;
i18n.defaultLocale = "en";

export default i18n;
