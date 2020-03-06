import axios from 'axios'
import moment from 'moment'

// 获取某篇文章的评论
const getComments = (article_id, offset, limit) => {
  return axios.get(`http://localhost:8080/api/v0.1/article/${article_id}/comments?_limit=${limit}&_start=${offset}`)
    .then(body => {
      const { data, headers } = body

      return {
        items: data,
        count: Number(headers['x-total-count'])
      }
    })
}

const postComment = (article_id, data) => {
  return axios.post(`http://localhost:8080/api/v0.1/article/${article_id}/comment`, {
    ...data,
    create_date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  }).then(body => {
    const { data, headers } = body
    return data
  })
}

export default {
  getComments,
  postComment
}
