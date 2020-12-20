<template>
  <div class="component-carousel" :class="!!showType ? 'container' : ''">
    <div class="component-carousel_container">
      <q-carousel
        v-model="slide"
        :vertical="!!showType"
        :transition-prev="showType === 5 ? 'jump-down' : 'jump-right'"
        :transition-next="showType === 5 ? 'jump-up' : 'jump-left'"
        swipeable
        animated
        infinite
        control-color="primary"
        arrows
        autoplay
        :thumbnails="$q.screen.gt.sm"
      >
        <template v-for="(item, index) of layoutCarouselInfoList">
          <q-carousel-slide :name="index" :img-src="item.carouselUrl" :key="index" />
        </template>
      </q-carousel>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Carousel',
  props: {
    layoutCarouselInfoList: {
      type: Array,
      required: true,
      default: function () {
        return [
          { carouselUrl: '' }
        ]
      }
    },
    showType: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      slide: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.component-carousel {
  padding-bottom: 40%;
  position: relative;
  .component-carousel_container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    > * {
      width: 100% !important;
      height: 100% !important;
      max-height: 100% !important;
      max-width: 100% !important;
    }
  }
}
</style>
