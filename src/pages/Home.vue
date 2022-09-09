<template>
  <div class="home">
    <swiper />
    <div class="section" v-for="(item, index) in songsList" :key="index">
      <div class="section-title">
        {{ item.name }}
      </div>
      <!-- 把item.list赋值给contentList子组件 -->
      <content-list :contentList="item.list"></content-list>
    </div>
  </div>
</template>

<script>
import Swiper from "../components/Swiper.vue";
import contentList from "../components/ContentList.vue";
import { getAllSinger, getAllSongList } from "../api/index";
export default {
  name: "home",
  components: {
    Swiper,
    contentList,
  },
  data() {
    return {
      songsList: [
        { name: "歌单", list: [] },
        { name: "歌手", list: [] },
      ],
    };
  },
  created() { // 页面创建的时候执行下面两个函数
    this.getSongList(), this.getSinger();
  },
  methods: {
    getSongList() {
      // 获取歌单
      getAllSongList()
        .then((res) => { // songsList[0]歌单
          this.songsList[0].list = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSinger() {
      //获取歌手
      getAllSinger()
        .then((res) => { // songsList[1]歌手
          this.songsList[1].list = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/home.scss";
</style>
