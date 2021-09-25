import { rest } from 'msw'

export const handlers = [
    rest.get('http://localhost:3030/goals', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    goal: {
                        progress: {
                            progress: 20,
                            startsAt: 0,
                            target: 100,
                        },
                        children: [],
                        user_id: '613e3b37d8a60fa0dbd5afc4',
                        title: 'some goal',
                        type: 'Monthly',
                        image: '',
                        isCompleted: false,
                    },
                    _id: '614b7bc5149e4b0016b14cf7',
                    createdAt: '2021-09-22T18:53:57.716Z',
                    updatedAt: '2021-09-22T18:53:57.716Z',
                    __v: 0,
                },
                {
                    goal: {
                        progress: {
                            progress: 0,
                            startsAt: 0,
                            target: 100,
                        },
                        children: [],
                        user_id: '613e3b37d8a60fa0dbd5afc4',
                        title: 'some new goal',
                        type: 'Monthly',
                        image: '',
                        isCompleted: false,
                    },
                    _id: '614b7bea149e4b0016b14cfa',
                    createdAt: '2021-09-22T18:54:34.630Z',
                    updatedAt: '2021-09-22T18:54:34.630Z',
                    __v: 0,
                },
                {
                    goal: {
                        progress: {
                            progress: 20,
                            startsAt: 0,
                            target: 100,
                        },
                        children: [],
                        user_id: '613e3b37d8a60fa0dbd5afc4',
                        title: 'goal title',
                        type: 'Monthly',
                        image: '',
                        isCompleted: false,
                    },
                    _id: '614b7caf149e4b0016b14d03',
                    createdAt: '2021-09-22T18:57:51.338Z',
                    updatedAt: '2021-09-22T18:57:51.338Z',
                    __v: 0,
                },
                {
                    goal: {
                        progress: {
                            progress: 30,
                            startsAt: 0,
                            target: 100,
                        },
                        children: [],
                        user_id: '613e3b37d8a60fa0dbd5afc4',
                        title: 'title',
                        type: 'Monthly',
                        image: '',
                        isCompleted: false,
                    },
                    _id: '614b7dd8149e4b0016b14d12',
                    createdAt: '2021-09-22T19:02:48.084Z',
                    updatedAt: '2021-09-22T19:02:48.084Z',
                    __v: 0,
                },
            ])
        )
    }),
]
