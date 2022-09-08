<template>
    <div class="song-list">
      <ul class="song-list-header">
        <li v-for="(item,index) in songStyle" :key="index" @click="handleChangView(item.name)"
            :class="{active:item.name==activeName}">
          {{item.name}}
        </li>
      </ul>
      <div>
          <content-list :contentList="dataSongListPage"></content-list>
          <div class="pagination">
              <el-pagination
              background
              :current-page="currentPage"
              :page-size="pageSize"
              :total="total"
              layout="total,prev,pager,next"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import ContentList from "../components/ContentList";
  import {getAllSongListPage,getSongListOfLikeStyle} from "../api/index";
  import {mixin} from "../mixins";
  import {songStyle} from "../assets/data/songList";
  export default {
      name: "song-list",
      components:{
        ContentList,
      },
      data(){
        return{
          albumDatas:[], //歌单数据
         //分页设置
          currentPage: 1,//当前页
          pageSize: 0,//分页的每页显示多少个
          total: 0,//总条数
          songStyle: [],   // 歌单风格
          activeName:'全部歌单', //当前风格
        }
      },
      computed:{
        //计算表格中的数据
        dataSongListPage(){
          return this.albumDatas;
        }
      },
    //   mounted(){
    //     // this.activeName = '全部歌单';
    //     this.songStyle = songStyle;
    //     this.getSongList();
    //   },
      created() {
        this.songStyle = songStyle;
         this.getSongList();
      },
      methods:{
        //获取当前页
        handleCurrentChange(val) {
              this.currentPage = val;
              this.getSongList();
        },
        getSongList(){
            this.albumDatas = [],
            getAllSongListPage(this.currentPage).then((res) => {
                this.albumDatas = res.records;
                this.pageSize = res.size;
                this.total = res.total;
            })
        },
        
        //根据style显示对应的歌单
        handleChangView(name){
          this.activeName = name;
          this.albumDatas = [];
          if(name=='全部歌单'){
            this.getSongList();
          }else{
            this.goSongListOfStyle(name);
          }
        },
        //根据歌单查询对应的歌单
        goSongListOfStyle(style){
          getSongListOfLikeStyle(style)
          .then(res =>{
              this.currentPage = 1;
              this.albumDatas = res;
            })
          
        },
      }
  };
  </script>
  <style lang="scss" scoped>
    @import "../assets/css/song-list.scss";
    </style>