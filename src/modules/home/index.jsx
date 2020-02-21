import React from 'react'
import { ModuleBase } from '~/base'
import Show from '~/containers/Show'

const prefix = 'home'

// 首页
export default class Home extends ModuleBase {
  render() {
    return (
      <div>
        {this.__(`${prefix}.init`)}
        <Show />
      </div>
    )
  }
}
