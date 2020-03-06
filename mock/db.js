const Mock = require('mockjs')
// 随机生成占位符
const Random = Mock.Random
// 设置请求延时，非ajax不能使用
// Mock.setup({
//   timeout: 400
// })

Random.extend({
  // 可以选择时间范围
  custom_datetime: function (format, min, max) {
    format = format || 'yyyy-MM-dd HH:mm:ss'
    min = min === undefined ? new Date(0) : min
    max = max === undefined ? new Date() : max
    const date = new Date(Math.random() * (max.getTime() - min.getTime()) + min.getTime())
    return this._formatDate(date, format)
  }
})

module.exports = function () {
  const data = {
    users: [],
    articles: [],
    comments: []
  }

  for (let i = 1; i <= 50; i++) {
    data.articles.push({
      id: i,
      title: Random.ctitle(),
      content: Random.cparagraph(),
      create_date: Random.custom_datetime(),
      userId: Random.integer(1, 20)
    })
  }

  for (let i = 1; i <= 20; i++) {
    data.users.push({
      id: i,
      name: Random.cname()
    })
  }

  for (let i = 1; i <= 1000; i++) {
    const articleId = Random.integer(1, 50)
    // 数组下标 = articleId - 1
    const create_date = Random.custom_datetime(undefined, new Date(data.articles[articleId - 1].create_date))
    data.comments.push({
      id: i,
      content: Random.csentence(),
      userId: Random.integer(1, 20),
      articleId: articleId,
      create_date: create_date
    })
  }

  return data
}