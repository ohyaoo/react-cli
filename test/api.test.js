import { getComments, postComment } from '../src/apis/data/index'

describe('测试 getComments', () => {
    test('返回结构测试', async () => {
        const comments = await getComments(1, 0, 10)
        expect(comments).toHaveProperty('items')
        expect(comments).toHaveProperty('count')
    })
})

describe('测试 postComment', () => {
    test('返回结构测试', async () => {
        const comment = await postComment(1, {
            content: '测试测试',
            userId: 7,
            articleId: 1,
        })
        expect(comment).toHaveProperty('content')
        expect(comment).toHaveProperty('userId')
        expect(comment).toHaveProperty('articleId')
        expect(comment).toHaveProperty('create_date')
        expect(comment).toHaveProperty('id')
    })

    test('数量测试', async () => {
        let { count: old_count } = await getComments(1, 0, 10)
        const comment = await postComment(1, {
            content: '测试测试',
            userId: 7,
            articleId: 1,
        })
        const { count } = await getComments(1, 0, 10)
        old_count++
        expect(old_count).toEqual(count)
    })
})