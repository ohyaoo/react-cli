import React from 'react'
import { ComponentBase } from '~/base'

export default class Show extends ComponentBase {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  render() {
    return this.state.data.map(d => <div key={d.id}>{d.content}</div>)
  }
}
