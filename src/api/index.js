import Axios from "axios";
import {get, post } from "./http";



//============歌手相关===========

//查询前十个歌手  用在首页
export const getAllSinger = (params) => get(`/singer/allSingerSelect`, params);
//查询全部歌手  以及分页 用在歌手页
export const getAllSingerPage = (pn) => get(`/singer/allSinger?pn=${pn}`);

//根据性别查询歌手  
export const getSingerOfSex = (sex) => get(`singer/singerOfSex?sex=${sex}`);

//下载音乐 
export const download = (url) => Axios({
    method: 'get',
    url: url,
    responseType: 'blob',
})


//============歌曲相关===========


//根据歌手id查询  
export const songOfSingerId = (id) => get(`song/singer/songsOfSingerId?singerId=${id}`);


//根据歌手名字模糊查询歌曲对象
export const likeSongOfName = (keywords) => get(`song/likeSongName?songName=${keywords}`);

//根据歌曲id查询歌曲对象  
export const songOfSongId = (id) => get(`song/songBySongId?songId=${id}`);

//============歌单相关===========

//查询前十个歌单  用在首页
export const getAllSongList = (params) => get(`/songList/allSongListSelect`, params);

//查询全部歌单，用在歌单页 以及分页
export const getAllSongListPage = (pn) => get(`/songList/all?pn=${pn}`);

//模糊查询 歌单标题包含文字的 歌单
export const getSongListOfLikeTitle = (keywords) => get(`songList/likeTitle?title=${keywords}`);

//根据风格模糊查询歌单列表
export const getSongListOfLikeStyle = (style) => get(`songList/likeStyle?style=${style}`);

//============歌单的歌曲相关===========
//根据歌单id查询歌曲列表    
export const listSongDetail = (songListId) => get(`listSong/songIdBySongListId?songListId=${songListId}`);


//============用户相关===========

//注册
export const SignUp = (params) => post(`/consumer/add`, params);

//登录 
export const loginIn = (consumer) => post(`/consumer/login`, consumer);

//根据用户id查询用户详细信息  
export const getUserOfId = (id) => get(`/consumer/selectByPrimaryKey?id=${id}`);
//更新用户信息  
export const updateUserMsg = (params) => post(`/consumer/update`, params);

//============收藏=============

//新增收藏   还没实现
export const setCollect = (params) => post(`/collect/add`, params);

//指定用户的收藏列表 
export const getCollectOfUserId = (userId) => get(`/collect/collectOfUserId?userId=${userId}`);


//=====================评价   =======================================
//提交评分  
export const setRank = (params) => post(`/rank/add`, params);
//获取指定歌单的平均分 
export const getRankOfSongListId = (songListId) => get(`/rank?songListId=${songListId}`);


//========================评论  ============
//提交评论 
export const setComment = (params) => post(`/comment/add`, params);
//点赞 
export const setLike = (params) => post(`/comment/like`, params);
//返回当前歌单或歌曲的评论列表
export const getAllComment = (type, id) => {
    if (type == 0) { //歌曲评论
        return get(`/comment/commentOfSongId?songId=${id}`);
    } else { //歌单评论 type=1
        return get(`/comment/commentOfSongListId?songListId=${id}`);
    }
}


// ====================开通会员======================
// 提交开通会员信息 
export const setVip = (params) => post(`/vip/add`, params);
//查询会员到期是否到期
export const flagVip = (userId) => get(`/vip/selectTime?userId=${userId}`);