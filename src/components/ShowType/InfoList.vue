<template>
  <div class="com-infoList container">
    <ul class="dest row wrap content-stretch" :class="$q.screen.lt.sm ? 'q-col-gutter-sm' : 'q-col-gutter-md'">
      <li class="col-4 col-sm-3 col-md-2" v-for="(item, index) of layoutDetailInfoList" :key="index">
        <div class="text-center animate scale" :class="$q.screen.lt.sm ? 'q-px-xs q-py-sm' : 'q-px-sm q-py-lg'">
          <p><q-icon :name="`img:${item.imgUrl}`" :size="$q.screen.lt.md ? $q.screen.lt.sm ? '40px' : '60px' : '80px'" color="grey" /></p>
          <p :class="$q.screen.lt.md ? $q.screen.lt.sm ? 'text-subtitle2' : 'text-h6' : 'text-h5'">{{ item.title }}</p>
          <div :class="$q.screen.lt.sm ? 'q-mt-xs' : 'q-mt-sm'">
            <p :class="$q.screen.lt.sm ? 'text-caption' : ''" v-for="(desc, idx) of item.descArray" :key="`${index}-${idx}`">{{ desc }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import scrollReveal from 'scrollreveal'
export default {
  name: 'InfoList',
  props: {
    layoutDetailInfoList: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  },
  mounted () {
    this.scrollReveal.reveal('.animate.scale', {
      viewFactor: 0.5,
      scale: 0.8,
      interval: 200,
      duration: 1000,
      cleanup: true,
      mobile: false
      // reset: true
    })
  },
  data () {
    return {
      scrollReveal: scrollReveal()
    }
  }
}
</script>
<style lang="scss" scoped>
.com-infoList {
  padding-bottom: 10px;
}
.dest {
  li > div {
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px 1px #e5e5e5;
  }
}
</style>
