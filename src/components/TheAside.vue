<!-- 点击底部播放音乐控件显示的歌单 -->
<template>
  <transition name="slide-fade">
    <div class="the-aside" v-if="showAside">
      <h2 class="title">歌单列表</h2>
      <ul class="menus">
        <li
          v-for="(item, index) in listOfSongs"
          :key="index"
          :class="{ 'is-play': id == item.id }"
          @click="
            gotoplay(
              item.id,
              item.url,
              item.pic,
              item.index,
              item.name,
              item.lyric,
              item.setVip
            )
          "
        >
          {{ replaceLName(item.name) }}
        </li>
      </ul>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
import {getCollectOfUserId, flagVip} from '../api/index';
export default {
  name: "the-aside",
  computed: {
    ...mapGetters([
      "showAside", // 是否显示播放中的歌曲列表
      "listOfSongs", //当前歌曲列表
      "id", //播放中的音乐id
      'loginIn',//用户是否已登录
      'userId',//当前登录用户的id
      'isActive',//当前播放的歌曲是否已经收藏
    ]),
  },
  mounted() {
    let _this = this;
    document.addEventListener(
      "click",
      function () {
        _this.$store.commit("setShowAside", false);
      },
      true
    );
  },
  methods: {
    //提示信息
    notify(title, type) {
            this.$notify({
                title: title,
                type: type
            })
        },
    //获取名字前半部分--歌手名
    replaceFName(str) {
      let arr = str.split("-");
      return arr[0];
    },
    //获取名字后半部分--歌名
    replaceLName(str) {
      let arr = str.split("-");
      return arr[1];
    },
    //播放
    // toplay: function (id, url, pic, index, name, lyric) {
    //   this.$store.commit("setId", id);
    //   this.$store.commit("setUrl", this.$store.state.configure.HOST + url);
    //   this.$store.commit("setPicUrl", this.$store.state.configure.HOST + pic);
    //   this.$store.commit("setListIndex", index);
    //   this.$store.commit("setTitle", this.replaceFName(name));
    //   this.$store.commit("setArtist", this.replaceLName(name));
    //   this.$store.commit("setLyric", this.parseLyric(lyric));
    //   this.$store.commit('setIsActive',false);
    //         if(this.loginIn){
    //             getCollectOfUserId(this.userId)
    //                 .then(res =>{
    //                     for(let item of res){
    //                         if(item.songId == id){
    //                             this.$store.commit('setIsActive',true);
    //                             break;
    //                         }
    //                     }
    //                 })
    //         }
    // },
    gotoplay: function(id, url, pic, index, name, lyric, setVip) {
            let _this = this;

            function play() {
                _this.$store.commit('setId', id);
                _this.$store.commit('setUrl', _this.$store.state.configure.HOST + url);
                _this.$store.commit('setPicUrl', _this.$store.state.configure.HOST + pic);
                _this.$store.commit('setListIndex', index);
                _this.$store.commit('setTitle', _this.replaceFName(name));
                _this.$store.commit('setArtist', _this.replaceLName(name));
                _this.$store.commit('setLyric', _this.parseLyric(lyric));
                _this.$store.commit('setIsActive', false);
                if (_this.loginIn) {
                    getCollectOfUserId(_this.userId)
                        .then(res => {
                            for (let item of res) {
                                if (item.songId == id) {
                                    _this.$store.commit('setIsActive', true);
                                    break;
                                }
                            }
                        })
                }
            }
            // 1.所点击的歌曲是否为vip歌曲
            if (setVip === 1) { //是vip歌曲
                // 2.判断是否登录
                if (!this.loginIn) { //未登录，不可以听
                    this.notify("VIP歌曲，请先登录", 'warning');
                } else if (this.loginIn) { //已登录
                    // 根据用户id判断是不是会员
                    function getDuedate(userId, duedate) {
                        flagVip(userId).then(res => {
                            if (res.code == 1) {
                                duedate = res.vipMsg.endTime;
                            } else {
                                duedate = '';
                            }
                            getdate(duedate);
                        })
                    }
                    getDuedate(this.userId, this.duedate);

                    function getdate(duedate) {
                        let dueMs = +new Date(duedate); // 到期时间转为毫秒
                        let openMs = +new Date(); // 当前时间的毫秒数
                        if ((!dueMs) || (dueMs < openMs)) { // 不是会员
                            _this.notify("VIP歌曲，请先开通会员", 'warning');
                        } else { // 是会员
                            play();
                        }
                    }
                }
            } else if (setVip === 0) {
                play();
            }
        },
    //解析歌词
    parseLyric(text) {
      let lines = text.split("\n"); //将歌词按行分解成数组
      let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g; //时间格式的正则表达式
      let result = []; //返回值
      //对于歌词格式不对的直接返回
      if (!/\[.+\]/.test(text)) {
        return [[0, text]];
      }
      //去掉前面格式不正确的行
      while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
      }
      //遍历每一行，形成一个每行带着量元素的数组，第一个元素是秒计算单位的时间，第二个元素是歌词
      for (let item of lines) {
        let time = item.match(pattern); //存前面的时间段
        let value = item.replace(pattern, ""); //存后面的歌词
        for (let item1 of time) {
          let t = item1.slice(1, -1).split(":"); // 取出时间，换算成数组
          if (value != "") {
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
          }
        }
      }
      //按照第一个元素--时间--排序
      result.sort(function (a, b) {
        return a[0] - b[0];
      });
      return result;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/css/the-aside.scss";
</style>