import Base from './Base'
import { COMPONENT_TYPE } from '~/constants'

export default class PageBase extends Base {
  static get __ComponentType__() { return COMPONENT_TYPE.PAGE }
}
