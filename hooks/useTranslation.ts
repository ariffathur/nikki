import i18n from "@localization/i18n";

export function useTranslation() {
  return {
    t: (key: string, options?: any) => i18n.t(key, options),
    locale: i18n.locale,
    setLocale: (locale: string) => {
      i18n.locale = locale;
    },
  };
}
