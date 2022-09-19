<template>
  <div class="content">
    <h1 class="title">
      <slot name="title"></slot>
    </h1>
    <hr/>
    <ul>
      <li>
        <div class="song-item">
          <span class="item-index"></span>
          <span class="item-title">歌曲名</span>
          <span class="item-name">歌手</span>
          <span class="item-intro">专辑</span>
        </div>
      </li>
      <li v-for="(item, index) in songList" :key="index">
        <div class="song-item" @click="gotoplay(item.id, item.url, item.pic, index, item.name, item.lyric, item.setVip)">
          <!-- 序号 -->
          <span class="item-index">
            {{ index + 1 }}
          </span>
          <!-- 歌曲名 -->
          <span class="item-title">
            <span>{{ replaceLName(item.name) }}</span>
            <img id="viplogo" v-if="item.setVip == 1" src="../assets/img/vipLogo.png">
          </span>
          <!-- 歌手 -->
          <span class="item-name">{{ replaceFName(item.name) }}</span>
          <!-- 专辑 -->
          <span class="item-intro" @click="getVIP(item.setVip)">{{ item.introduction }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mixin } from "../mixins";
// import {mapGetters} from 'vuex';
export default {
  name: "album-content",
  mixins: [mixin],
  props: ["songList"], // 获取传过来的songList
};
</script>
<style lang="scss" scoped>
@import "../assets/css/album-content.scss";
</style>
