<template>
  <div id="app">
    <the-header />
    <router-view class="music-content" />
    <scroll-top />
    <song-audio />
    <the-aside />
    <play-bar/>
  </div>
</template>
<script>
import TheHeader from "./components/TheHeader";
import ScrollTop from "./components/ScrollTop.vue";
import SongAudio from "./components/SongAudio.vue";
import PlayBar from "./components/PlayBar.vue";
import TheAside from "./components/TheAside.vue";
export default {
  name: "App",
  components: {
    TheHeader,
    ScrollTop,
    SongAudio,
    PlayBar,
    TheAside,
  },
};
</script>
<style  lang="scss" scoped>
@import "./assets/css/app.scss";
</style>
