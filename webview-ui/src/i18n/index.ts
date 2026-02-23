import { useMemo } from "react"
import { translations, type Language, type Translations } from "./translations"

export function useTranslation(language: Language = "en"): Translations {
	return useMemo(() => translations[language], [language])
}

export type { Language, Translations }
