import React from 'react'
import PropTypes from 'prop-types'

// 根组件，初始化context
export default class Root extends React.Component {
  static propTypes = {
    children: PropTypes.element
  };

  render() {
    const { children } = this.props
    return children
  }
}
