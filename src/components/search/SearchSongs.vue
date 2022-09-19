<!-- SearchSongs用来调用， AlbumContent作显示 -->
<template>
  <div class="songs-body">
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
    this.getSong();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/search-songs.scss";
</style>