<template>
    <div class="singer">
      <ul class="singer-header">
        <li v-for="(item,index) in singerStyle" :key="index" @click="handleChangView(item)"
            :class="{active:item.name==activeName}">
          {{item.name}}
        </li>
      </ul>
      <div>
          <content-list :contentList="dataSongListPage"></content-list>
          <div class="pagination">
              <el-pagination @current-change="handleCurrentChange" background layout="total,prev,pager,next"
              :current-page="currentPage" :page-size="pageSize" :total="total">
              </el-pagination>     
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import ContentList from "../components/ContentList";
  import {getAllSingerPage ,getSingerOfSex} from "../api/index";
  import {mixin} from "../mixins";
  import {singerStyle} from "../assets/data/singer";
  export default {
      name: 'singer',
      components:{
        ContentList,
      },
      data(){
        return{
          albumDatas:[], //歌手数据
          //分页设置
          currentPage: 1,//当前页
          pageSize: 0,//分页的每页显示多少个
          total: 0,//总条数
          singerStyle: [],   // 歌单风格
          activeName:'全部歌手', //当前风格
        }
      },
      computed:{
        //计算表格中的数据
        dataSongListPage(){
          return this.albumDatas;
        }
      },
      mounted(){
        // this.activeName = '全部歌单';
        this.singerStyle = singerStyle;
        this.getSingerList();
        
      },
      methods:{
        getSingerList(){
            getAllSingerPage (this.currentPage)
            .then(res =>{
                this.albumDatas = res.records;
                this.pageSize = res.size;
                this.total = res.total;
          })
        },
        //获取当前页
        handleCurrentChange(val){
          this.currentPage = val;
          this.getSingerList();
        },
        //根据类型显示对应的歌手
        handleChangView(item){
          this.activeName = item.name;
          this.albumDatas = [];
          if(item.name=='全部歌手'){
            this.getSingerList();
          }else{
            this.getSingerOfSex(item.type);
          }
        },
        //根据性别查询对应的歌手
        getSingerOfSex(sex){
          getSingerOfSex(sex)
          .then(res =>{
              this.currentPage = 1;
              this.albumDatas = res;
            })
          
        },
      }
  };
  </script>
  <style lang="scss" scoped>
    @import "../assets/css/singer.scss";
    </style>