import React from 'react'

// 将context内容通过prop注入子组件
export default function inject(context) {
  return function (WrappedComponent) {
    return class extends React.Component {
      static displayName = `Inject(${WrappedComponent.name})`;
      render() {
        return (
          <context.Consumer>
            {value => <WrappedComponent {...this.props} {...value} />}
          </context.Consumer>
        )
      }
    }
  }
}
