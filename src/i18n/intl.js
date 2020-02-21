import React from 'react'
import { addLocaleData, IntlProvider } from 'react-intl'
import { LocaleProvider } from 'antd-mobile'
import enUS from 'antd-mobile/lib/locale-provider/en_US'
import { getLocale } from '~/utils/common'
const localesProject = require('./modules')
const localesFish = require('./modules/fish')
const localesReactIntl = require('./modules/react-intl')

Object.values(localesReactIntl).map(localesReactIntlItem =>
  addLocaleData(localesReactIntlItem)
)
addLocaleData({ locale: 'zh-CN', parentLocale: 'zh' })

export default class Intl extends React.Component {
  static displayName = 'Intl';

  getTranslation(locale) {
    switch (locale) {
      case 'en':
      case 'en-US':
        return enUS
      case 'zh-CN':
        return {}
      default:
        return localesFish[locale]
    }
  }

  render() {
    const locale = getLocale()

    return (
      <IntlProvider
        locale={locale}
        key={locale}
        messages={localesProject[locale]}
      >
        <LocaleProvider locale={this.getTranslation(locale)}>
          {this.props.children}
        </LocaleProvider>
      </IntlProvider>
    )
  }
}
