import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import staticLangs from '../../data/langs.json'

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
    return langObject?.[key]?.[currentLang.value.value] || defaultText
  }

  const getValueByPath = (obj, path) => {
    return path.split('.').reduce((acc, key) => acc[key], obj);
  }

  const getLastSegment = (path) => {
    return path.split('.').pop()
  }

  const getStaticTextLang = (key, defaultText = '') => {
    const lastSegment = getLastSegment(key);
    return getTextLang({
      [lastSegment]: getValueByPath(staticLangs, key)
    }, lastSegment, defaultText)
  }

  const nextLang = computed(() => {
    const index = langs.findIndex(lang => lang.value === currentLang.value.value)
    return langs[(index + 1) % langs.length]
  })

  const toggleLang = () => {
    setLang(nextLang.value)
  }

  return {
    langs,
    currentLang,
    setLang,
    getTextLang,
    getStaticTextLang,
    toggleLang,
    nextLang
  }
})
