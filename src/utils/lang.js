export const getTextLang = (langObject, key, defaultText) => {
  return langObject[key] || defaultText
}
