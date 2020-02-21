import { Toast } from 'antd-mobile'

class Message {
  showMessage ({ type, msg }) {
    Toast[type || 'info'](msg)
  }
}

// 单例
export default new Message()
