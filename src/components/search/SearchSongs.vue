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
  mounted() {
    this.getSong();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/search-songs.scss";
</style>