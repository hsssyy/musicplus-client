const user = ({
    state: {
        userId: '', //用户id
        username: '', //用户账号
        avator: '', //用户头像
        duedate: '', //会员到期时间
    },
    getters: {
        userId: state => {
            let userId = state.UserId
            if (!userId) {
                userId = JSON.parse(window.sessionStorage.getItem('userId'))
            }
            return userId
        },
        username: state => {
            let username = state.username
            if (!username) {
                username = JSON.parse(window.sessionStorage.getItem('username'))
            }
            return username
        },
        avator: state => {
            let avator = state.avator
            if (!avator) {
                avator = JSON.parse(window.sessionStorage.getItem('avator'))
            }
            return avator
        },
        duedate: state => {
            let duedate = state.duedate
            if (!duedate) {
                duedate = JSON.parse(window.sessionStorage.getItem('duedate'))
            }
            return duedate
        },
    },
    mutations: {
        setUserId: (state, userId) => {
            state.userId = userId
            window.sessionStorage.setItem('userId', JSON.stringify(userId))
        },
        setUsername: (state, username) => {
            state.username = username
            window.sessionStorage.setItem('username', JSON.stringify(username))
        },
        setAvator: (state, avator) => {
            state.avator = avator
            window.sessionStorage.setItem('avator', JSON.stringify(avator))
        },
        setDuedate: (state, duedate) => {
            state.duedate = duedate
            window.sessionStorage.setItem('duedate', JSON.stringify(duedate))
        },
    }
})
export default user