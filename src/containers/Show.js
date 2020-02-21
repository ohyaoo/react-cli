import React from 'react'
import { ContainerBase } from '~/base'
import { ShowContext } from '~/context'
import Show from '~/components/Show'
import dataApis from '~/apis/data'

// 容器组件
export default class ContainerShow extends ContainerBase {
  // 获取笔记列表
  getData = async () => {
    const data = await dataApis.getData().catch(err => console.log(err)) || {
      time: ''
    }
    return data.time
  };

  render() {
    return (
      <ShowContext.Provider value={{ getData: this.getData }}>
        <Show {...this.props} />
      </ShowContext.Provider>
    )
  }
}
