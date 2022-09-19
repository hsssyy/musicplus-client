<template>
    <div class="singer-album">
      <div class="album-slide">
        <div class="singer-img">
          <img :src="attachImageUrl(singer.pic)">
        </div>
        <ul class="info">
          <li v-if = "singer.sex == 0||singer.sex==1">{{attachSex(singer.sex)}}</li>
          <li>生日：{{attachBirth(singer.birth)}}</li>
          <li>故乡：{{singer.location}}</li>
        </ul>
      </div>
      <div class="album-content">
        <div class="intro">
          <h2>{{singer.name}}</h2>
          <span>{{singer.introduction}}</span>
        </div>
        <div class="songs-body">
          <album-content :songList="songLists">
            <template  slot = "title">歌单</template>  
          </album-content>
        </div>
      </div>

    </div>
</template>
<script>
import { mixin } from "../mixins";
import {mapGetters} from 'vuex';
import {songOfSongId,songOfSingerId,getSingerOfId} from '../api/index';
import AlbumContent from "../components/AlbumContent";
export default {
  name: "singer-album",
  mixins: [mixin],
  components:{
    AlbumContent,
    // Comment
  },
  data(){
      return{
          singerId: '',//前面传来的歌手id
          singer:[],//当前歌手信息
          songLists:[],//对当前页面需要展示的歌曲列表
      }
  },
  computed:{
      ...mapGetters([
          'listOfSongs',//当前播放列表
          'tempList',//当前歌手对象
          'loginIn',//用户是否已经登录
          'userId',//当前登录用户id
      ])
  },
  created(){
    this.singerId = this.$route.params.id;
    // this.singer = this.tempList;
    this.getSongOfSingerId();
    this.getSingerInfoById();
  },
  methods:{
    //根据歌手id查询歌曲
    getSongOfSingerId(){
      songOfSingerId(this.singerId)
        .then(res =>{
          for(let item of res){
            console.log(item);
            this.getRankt(item.id); //歌曲id
          }
          this.$store.commit('setListOfSongs',this.songLists);
        })
        .catch(err =>{
          console.log(err)
        })
    },
    //根据歌手id 获取歌曲信息
    getSingerInfoById(){
      getSingerOfId(this.singerId)
      .then(res =>{
        if(res){
          this.singer = res;
        }
      })
    },
    //根据歌曲id获取歌曲信息
    getRankt(id){
      songOfSongId(id)
          .then(res =>{
              this.songLists.push(res);
          })
          .catch(err =>{
              console.log(err);
          })
    },
    //获取性别
    attachSex(value){
      if(value == 0){
        return '女';
      }else if(value ==1){
        return '男';
      }
      return ''
    },
  },
}
</script>

<style lang ="scss" scoped>
@import '../assets/css/singer-album.scss';
</style>