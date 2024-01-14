<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-11 14:23:10
 * @LastEditors: harley
 * @LastEditTime: 2023-10-17 19:02:55
-->
<template>
  <div class="video-play">
    <video
      :src="props.src"
      autoplay
      loop
      muted
      :controls="false"
      preload
      x5-video-player-fullscreen="true"
      x5-playsinline
      playsinline
      webkit-playsinline
    ></video>
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.video-play {
  width: 100%;
  height: 100%;
  overflow: hidden;
  video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}
</style>
