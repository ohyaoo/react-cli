import React from 'react'
import { Button } from 'antd-mobile'
import { PageBase } from '~/base'
import inject from '~/decorators/inject'
import { ContextHome } from '~/context'
import Show from '~/components/Show'

const prefix = 'home'

// 首页
export default @inject(ContextHome) class Home extends PageBase {
  state = {
    data: []
  }
  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const { getComments } = this.props
    const { items } = await getComments(1, 0, 100)
    console.log(items)
    this.setState({
      data: items
    })
  }

  handleAdd = () => {
    const { postComment, getComments } = this.props
    postComment().then(() => {
      this.getData()
    })
  }
  render() {
    const { data } = this.state
    console.log(data)
    return (
      <div>
        {this.__(`${prefix}.init`)}
        <Show />
        {data.map(item => <div key={item.id}><span>{item.id}</span>: <span>{item.content}</span></div>)}
        <Button onClick={this.handleAdd}>{'add'}</Button>
      </div>
    )
  }
}
