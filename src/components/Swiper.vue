<template>
  <div class="swiper">
    <el-carousel :interval="4000" type="card" height="280px">
      <!-- v-for遍历swiperList  取出来的每项数据是item,索引index;在v-bind后，就可以动态获取数据 -->
      <el-carousel-item v-for="(item, index) in swiperList" :key="index">
        <img :src="item.picImg" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { swiperList } from "../assets/data/swiper";
export default {
  name: "swiper",
  data() {
    return {
      swiperList: [], // 轮播图的数据（图片）
    };
  },
  created() { // 在创建的时候引入data
    this.swiperList = swiperList; // 让data里的swiperList=import的swiperList
  },
};
</script>
<style scoped>
@import "../assets/css/swiper.scss";
</style>