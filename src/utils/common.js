import qs from 'query-string'
const localesProject = require('~/i18n/modules')
const defaultLang = 'zh-CN'

export function getLocale() {
  let locale = getSearchValueByKeys(['locale', 'lang'])
  if (!locale) {
    const languagesFirstItem =
      global.navigator.languages && global.navigator.languages[0]
    locale =
      global.navigator.language ||
      languagesFirstItem ||
      global.navigator.userLanguage ||
      defaultLang
  }

  if (!localesProject[locale]) {
    locale = defaultLang
  }
  return locale
}

function getSearchValueByKeys(keys, defaultValue = '') {
  let value = defaultValue
  const searchParams = qs.parse(location.search)
  keys.find(key => {
    if (searchParams[key]) {
      value = searchParams[key]
      return true
    }
  })
  return value
}
