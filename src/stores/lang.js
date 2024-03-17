import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLangStore = defineStore('lang', () => {
  const langs = [
    {
      value: 'th',
      name: 'ภาษาไทย'
    },
    {
      value: 'en',
      name: 'English'
    }
  ]
  const currentLang = ref(langs[0])

  const setLang = (newLang) => {
    currentLang.value = newLang
  }

  const getTextLang = (langObject, key, defaultText = '') => {
    return langObject[key]?.[currentLang.value.value] || defaultText
  }

  return {
    langs,
    currentLang,
    setLang,
    getTextLang
  }
})
