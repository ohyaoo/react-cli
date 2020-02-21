import React from 'react'
import { intlShape } from 'react-intl'
import { COMPONENT_TYPE } from '~/constants'

export default class Base extends React.Component {
  static contextTypes = {
    intl: intlShape
  };

  static get __ComponentType__() {
    return COMPONENT_TYPE.BASE
  }

  /**
   * 多语言
   * @param {string} id 翻译关键词
   * @param {object} values 占位符
   * @param {string} defaultMessage 默认值
   */
  __ = (id, values = {}, defaultMessage) => {
    const { formatMessage } = this.context.intl

    // id是一个对象时
    if (typeof id === 'object') {
      const { id: key, values: val, defaultMessage: message } = id
      id = key
      values = val
      defaultMessage = message
    }

    // values是一个字符串，则是一个默认值
    if (typeof values === 'string') {
      defaultMessage = values
      values = {}
    }

    // 缺少默认值，则id作为默认值
    if (typeof defaultMessage === 'undefined') {
      defaultMessage = id
    }

    return formatMessage(
      {
        id: id,
        defaultMessage: defaultMessage
      },
      { ...values }
    )
  };
}
