<template>
    <div class="vip">
      <div class="u-info">
        <div class="u-img">
            <img :src = "attachImageUrl(avator)">
        </div>
        <ul class="u-name">
            <li>{{username}}
                <span class="due-date">会员到期时间：{{duedate}}</span>
                <span class="due-info">您还未开通会员噢~</span>
            </li>  
        </ul>
        <span class="title">开通会员</span>
      </div>
      <div class="vip-content">
        <vip-content></vip-content>
      </div>
    </div>
  </template>
  <script>
  import {mixin} from '../mixins';
  import {mapGetters} from 'vuex';
  import {getUserOfId,flagVip} from '../api/index';
  import VipContent from "../components/VipContent";
  export default {
    name: "vip",
    mixins: [mixin],
    components:{
      VipContent
    },
    data(){
      return {
        avator: '',  //用户的头像
        username: '',//昵称
        duedate: '', //会员到期时间
      }
    },
    computed:{
      ...mapGetters([
        'userId',//当前登录用户id
      ])
    },
    mounted(){
      this.getMsg(this.userId);
      
    },
    methods:{
      getMsg(userId){
        getUserOfId(userId)
        .then(res =>{
            this.avator = res.avator;
            this.username = res.username;
          })
          .catch(err =>{
            console.log(err);
          })
        flagVip(userId).then(res =>{//查询会员，和展示到期时间。
          if(res.code == 1) {
            this.duedate = res.vipMsg.endTime;
            this.showDuedate(this.duedate);
          }
            
        })
      },
      showDuedate(duedate) {
        if(duedate){
          document.querySelector('.due-date').style.display = 'block';
      } else {
        document.querySelector('.due-info').style.display = 'block';
      }
      }
    },
  };
  </script>
  <style lang = "scss" scoped>
  @import "../assets/css/vip.scss";
  </style>