import { defineStore } from 'pinia'
import { AppStateType } from './store'
import i18n, { getLanguage } from '@/lang/index.ts'

export const useAppStore = defineStore('app', {
  state: (): AppStateType => ({
    language: getLanguage()
  }),
  actions: {
    setLanguage(lang: string) {
      this.language = lang
      i18n.locale = lang
    }
  }
})