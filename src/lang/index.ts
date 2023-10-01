import { createI18n } from 'vue-i18n'

import zhLocale from './zh'
import enLocale from './en'

const messages = {
  zh: {
    ...zhLocale
  },
  en: {
    ...enLocale
  }
}
export function getLanguage() {
  let lang = localStorage.getItem('language')
  if (lang && lang !== 'null') return lang
  return window.navigator.language
}

const i18n = createI18n({
  locale: getLanguage(),
  fallbackLocale: 'en',
  messages
})

export default i18n