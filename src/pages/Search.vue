<template>
  <div class="search">
    <nav class="searchList-nav" ref="change">
      <!-- 判断toggle(在点击函数里获得)是否等于'Songs'(当前页面) -->
      <span :class="{ isActive: toggle == 'Songs' }" @click="handleChangeView('Songs')" >歌曲</span>
      <span :class="{ isActive: toggle == 'SongLists' }" @click="handleChangeView('SongLists')">歌单</span>
    </nav>
    <!--切换组件 -->
    <component :is="currentView"> </component>
  </div>
</template>

<script>
import searchSongs from "../components/search/SearchSongs.vue";
import searchSongLists from "../components/search/SearchSongLists.vue";
export default {
  name: "search",
  components: {
    searchSongs,
    searchSongLists,
  },
  data() {
    return {
      toggle: "Songs", // 默认歌曲页面
      currentView: "searchSongs", //当前页面默认searchSongs页面
    };
  },
  methods: {
    //切换组件
    handleChangeView(component) {
      this.currentView = "search" + component;
      this.toggle = component;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/search.scss";
</style>