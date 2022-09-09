const configure = ({
    state: {
        HOST: 'http://127.0.0.1:8888', //后台访问地址根目录
        activeName: '', //当前选中的菜单名
        showAside: false, //是否显示播放中的歌曲列表 TheAside.vue 组件
        loginIn: false, //用户是否已登录
        isActive: false, //当前歌曲是否已收藏
        // isMealActive: false,
        // isPayActive: false,
    },
    getters: { // 获取方式
        activeName: state => {
            let activeName = state.activeName
            if (!activeName) { // 没有的话ActiveName，从sessionStorage里取
                activeName = JSON.parse(window.sessionStorage.getItem('activeName'))
            }
            return activeName
        },
        showAside: state => {
            let showAside = state.showAside
            if (!showAside) {
                showAside = JSON.parse(window.sessionStorage.getItem('showAside'))
            }
            return showAside
        },
        loginIn: state => {
            let loginIn = state.loginIn
            if (!loginIn) {
                loginIn = JSON.parse(window.sessionStorage.getItem('loginIn'))
            }
            return loginIn
        },
        isActive: state => {
            let isActive = state.isActive
            if (!isActive) {
                isActive = JSON.parse(window.sessionStorage.getItem('isActive'))
            }
            return isActive
        },
        // isMealActive: state => {
        //     let isMealActive = state.isMealActive
        //     if (!isMealActive) {
        //         isMealActive = JSON.parse(window.sessionStorage.getItem('isMealActive'))
        //     }
        //     return isMealActive
        // },
        // isPayActive: state => {
        //     let isPayActive = state.isPayActive
        //     if (!isPayActive) {
        //         isPayActive = JSON.parse(window.sessionStorage.getItem('isPayActive'))
        //     }
        //     return isMealActive
        // },
    },
    mutations: { // 设置
        setActiveName: (state, activeName) => {
            // 页面调用setActiveName时传过来的activeName 赋值给 state的activeName
            state.activeName = activeName
                // 传过来的activeName放到sessionStorage里面
            window.sessionStorage.setItem('activeName', JSON.stringify(activeName))
        },
        setShowAside: (state, showAside) => {
            state.showAside = showAside
            window.sessionStorage.setItem('showAside', JSON.stringify(showAside))
        },
        setLoginIn: (state, loginIn) => {
            state.loginIn = loginIn
            window.sessionStorage.setItem('loginIn', JSON.stringify(loginIn))
        },
        setIsActive: (state, isActive) => {
            state.isActive = isActive
            window.sessionStorage.setItem('isActive', JSON.stringify(isActive))
        },
        // setIsMealActive: (state, isMealActive) => {
        //     state.isMealActive = isMealActive
        //     window.sessionStorage.setItem('isMealActive', JSON.stringify(isMealActive))
        // },
        // setIsPayActive: (state, isPayActive) => {
        //     state.isPayActive = isPayActive
        //     window.sessionStorage.setItem('isPayActive', JSON.stringify(isPayActive))
        // },
    }
})
export default configure