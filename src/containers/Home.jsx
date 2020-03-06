import React from 'react'
import { ContainerBase } from '~/base'
import { ContextHome } from '~/context'
import Home from '~/pages/Home'
import dataApis from '~/apis/data'

// 容器组件
export default class ContainerHome extends ContainerBase {
  // 获取评论
  getComments = async (article_id, offset, limit) => {
    const data = await dataApis.getComments(article_id, offset, limit).catch(err => console.log(err))
    return data
  };

  postComment = async () => {
    const data = await dataApis.postComment(1, {
      content: '测试测试',
      userId: 7,
      articleId: 1,
    })
    return data
  }

  render() {
    return (
      <ContextHome.Provider value={{ getComments: this.getComments, postComment: this.postComment }}>
        <Home {...this.props} />
      </ContextHome.Provider>
    )
  }
}
