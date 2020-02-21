import { ComponentBase } from '~/base'
import inject from '~/decorators/inject'
import { ShowContext } from '~/context'

@inject(ShowContext)
export default class Show extends ComponentBase {
  constructor() {
    super()
    this.state = {
      data: ''
    }
  }
  componentWillMount() {
    this.props.getData().then(data => {
      this.setState({ data })
    })
  }
  render() {
    return this.state.data
  }
}
