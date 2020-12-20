<template>
  <section class="part">
    <div v-if="[0, 8].indexOf(info.showType) < 0" :class="[info.showType === 7 ? 'embedInset' : '', $q.screen.lt.md ? 'q-mt-md' : 'title-box']">
      <slot name="title">
        <title-group :title="info.title" :sub-title="info.subTitle" :show-type="info.showType" />
      </slot>
    </div>
    <div class="content-box">
      <slot></slot>
    </div>
  </section>
</template>
<script>
import TitleGroup from './TitleGroup.vue'
export default {
  name: 'IndexContainer',
  components: { TitleGroup },
  props: {
    info: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.part {
  overflow: hidden;
  position: relative;
  .title-box {
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .embedInset {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
}
</style>
