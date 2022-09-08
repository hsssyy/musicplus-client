import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Singer from '@/pages/Singer'
import SongList from '@/pages/SongList'
import Search from '@/pages/Search'
import Lyric from '@/pages/Lyric'
import LoginIn from '@/pages/LoginIn'
import SignUp from '@/pages/SignUp'
import SingerAlbum from '@/pages/SingerAlbum'
import SongListAlbum from '@/pages/SongListAlbum'
import Setting from '@/pages/Setting'
import MyMusic from '@/pages/MyMusic'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    ,
    {
      path: '/singer',
      name: 'singer',
      component: Singer
    },//歌手
    {
      path: '/song-list',
      name: 'song-list',
      component: SongList
    },//歌单
    {
      path: '/search',
      name: 'search',
      component: Search
    },//搜索
    {
      path: '/lyric',
      name: 'lyric',
      component: Lyric
    },//歌词
    {
      path: '/login-in',
      name: 'login-in',
      component: LoginIn
    },//登录
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    },//注册
    ,
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },//设置
    {
      path:'/singer-album/:id',
      name:'singer-album',
      component:SingerAlbum
    },//歌手列表
    {
      path:'/song-list-album/:id',
      name:'song-list-album',
      component:SongListAlbum
    },//歌单列表
    {
      path: '/my-music',
      name: 'my-music',
      component: MyMusic
    },//我的音乐
    
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
