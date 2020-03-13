import { getComments, postComment, patchComment, deleteComment, putComment } from '../src/apis/data/index'

describe('获取', () => {
    test('getComments', async () => {
        const comments = await getComments(1, 0, 10)
        expect(comments).toHaveProperty('items')
        expect(comments).toHaveProperty('count')
    })
})

describe('新增', () => {
    test('postComment', async () => {
        const comment = await postComment(1, {
            id: 2,
            content: '测试测试',
            userId: 7,
            articleId: 1,
        })
        expect(comment).toHaveProperty('content')
    })
})

describe('修改', () => {
    test('patchComment', async () => {
        const comment = await patchComment(1, '测试1')
        expect(comment.content).toBe('测试1')
    })

    test('putComment', async () => {
        const comment = await putComment(1, '只剩一个')
        expect(comment.content).toBe('只剩一个')
    })
})

describe('删除', () => {
    test('deleteComment', async () => {
        const comment = await deleteComment(2)
        expect(comment).toStrictEqual({})
    })
})