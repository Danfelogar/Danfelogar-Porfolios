import { map } from 'nanostores';
import { DEFAULT_LANG } from '../i18n/utils';


interface Props {
    lang: "es" | "en"
}

export const $settings = map<Props>({
    lang: DEFAULT_LANG
})

export function changeToSpanish() {
    $settings.set({ lang: "es" })
}

export function changeToEnglish() {
    $settings.set({ lang: "en" })
}