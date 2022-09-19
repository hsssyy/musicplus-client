<template>
  <div class="the-header">
    <div class="header-logo" @click="goHome">
      <!-- <svg class="icon">
        <use xlink:href="#icon-erji"></use>
      </svg> -->
      <span class="logo1">Yep</span>
      <span class="logo2">Music</span>
    </div>
    <ul class="navbar">
      <!-- 循环遍历导航栏navMsg 放到data里面 -->
      <!-- 判断item.name是否等于mapGetters监控的activeName，是的话active类就有效 -->
      <li
        :class="{ active: item.name == activeName }"
        v-for="item in navMsg"
        :key="item.path"
        @click="goPage(item.path, item.name)"
      >
        {{ item.name }}
      </li>
      <li>
        <div class="header-search">
          <input
            type="text"
            placeholder="搜索音乐"
            @keyup.enter="goSearch()"
            v-model="keywords"
          />
          <div class="search-btn" @click="goSearch()">
            <svg class="icon">
              <use xlink:href="#icon-sousuo"></use>
            </svg>
          </div>
        </div>
      </li>
      <li
        v-show="!loginIn"
        :class="{ active: item.name == activeName }"
        v-for="item in loginMsg"
        :key="item.path"
        @click="goPage(item.path, item.name)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="header-right" v-show="loginIn">
      <div id="user">
        <img :src="attachImageUrl(avator)" />
      </div>
      <div class="user-name">{{username}}</div>
      <ul class="menu">
        <li
          v-for="(item, index) in menuList"
          :key="index"
          @click="goMenuList(item.path)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; // mapGetters从整个工程其他地方获取数据
import { navMsg, loginMsg, menuList } from "../assets/data/header";
export default {
  name: "the-header",
  data() {
    return {
      navMsg: [],   //左侧导航栏
      keywords: "", //搜索关键字
      loginMsg: [], //右侧导航栏
      menuList: [], //用户下拉菜单
    };
  },
  computed: { // 监控数据的获取
    ...mapGetters(["activeName", "loginIn", "avator","username"]), //监控到的"activeName", "loginIn", "avator"可以当做该页面的数据（和data里相同）
  },

  created() { // 当创建时加载
    this.navMsg = navMsg;
    this.loginMsg = loginMsg;
    this.menuList = menuList;
  },
  mounted() {
    document.querySelector("#user").addEventListener(
      "click",
      function (e) {
        document.querySelector(".menu").classList.add("show");
        e.stopPropagation(); //关键在于阻止冒泡
      },
      false
    );
    document.querySelector(".menu").addEventListener(
      "click",
      function (e) {
        e.stopPropagation(); //点击菜单内部时，阻止时间冒泡，这样，点击内部时，菜单不会关闭
      },
      false
    );
    document.addEventListener(
      "click",
      function () {
        document.querySelector(".menu").classList.remove("show");
      },
      false
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
    goHome() {
      // push 后面可以是对象，也可以是字符串（这里是对象query相当与发送了一次get请求，请求参数会显示在浏览器地址栏中）
      this.$router.push({ path: "/" });
    },
    goPage(path, name) {
      if(!this.loginIn && path=='/my-music'||(!this.loginIn && path=='/vip')){
        this.notify("请先登录",'warning')
      }else{
        this.$store.commit("setActiveName", name);
        this.$router.push({ path: path });
      }
    },
    goSearch() {
      this.$router.push({
        path: "/search",
        query: { keywords: this.keywords },
      });
    },
    attachImageUrl(srcUrl) {
      // return srcUrl
      //   ? this.$store.state.configure.HOST + srcUrl
      //   : "../assets/img/user.jpg";
      return this.$store.state.configure.HOST + srcUrl;
    },
    goMenuList(path) {
      if (path == 0) {
        this.$router.push({ path: "/" });
        this.$store.commit("setLoginIn", false);
        this.$store.commit("setIsActive", false);
        this.$router.go(0);
        this.$store.commit('setId', '');
        this.$store.commit('setUrl', '');
        this.$store.commit('setPicUrl', '');
        this.$store.commit('setListIndex', '');
        this.$store.commit('setTitle', '');
        this.$store.commit('setArtist', '');
        this.$store.commit('setLyric', '');
        // if (!this.loginIn) {
        //   this.$store.commit('setIsActive', false);
        // }
      } else {
        this.$router.push({ path: path });
      }
    },
  },
};
</script>

<style  lang="scss" scoped>
@import "../assets/css/the-header.scss";
</style>
