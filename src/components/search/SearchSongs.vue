<!-- SearchSongs用来调用，AlbumContent作显示 -->
<template>
  <div class="search-songs">
    <album-content :songList="listOfSongs"></album-content>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mixin } from "../../mixins";
import AlbumContent from "../AlbumContent.vue";
export default {
  components: { AlbumContent },
  name: "search-songs",
  mixins: [mixin],
  computed: {
    ...mapGetters(["listOfSongs"]),
  },
  mounted() { // 页面加载时执行
    this.getSong(); // mixins——>index.js根据歌手名字模糊查询
  },
};
</script>
<!-- 执行getSong()来获得listOfSong放到缓存里，computed监控这个值，
  监控到后songList会把值传到album-content里显示) -->
<style lang="scss" scoped>
@import "../../assets/css/search-songs.scss";
</style>