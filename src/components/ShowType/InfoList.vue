<template>
  <div class="com-infoList container">
    <div style="height: 1px;" id="target1"></div>
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
import * as ScrollMagic from 'scrollmagic'
import Velocity from 'velocity-animate'
import { ScrollMagicPluginVelocity } from 'scrollmagic-plugins'
ScrollMagicPluginVelocity(ScrollMagic, Velocity)
// import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.velocity.js'
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
    // setTimeout(() => {
    //   this.scrollReveal.reveal('.animate.scale', {
    //     viewFactor: 0.5,
    //     scale: 0.8,
    //     interval: 200,
    //     duration: 1000,
    //     cleanup: true,
    //     mobile: false
    //     // reset: true
    //   })
    // }, 2000)
    const revealElements = document.querySelectorAll('.com-infoList .animate.scale')
    const controller = new ScrollMagic.Controller()
    Array.from(revealElements).forEach((item, index) => {
      const scene = new ScrollMagic.Scene({
        triggerElement: '#target1',
        triggerHook: 0.9, // show, when scrolled 10% into view
        // duration: '80%', // hide 10% before exiting view (80% + 10% from bottom)
        offset: 50, // move trigger to center of element
        reverse: false // only do once
      })
      // scene.setClassToggle(item, 'active') // add class to reveal
      // scene.addIndicators() // add indicators (requires plugin)
      scene.setVelocity(item, { opacity: 1, scale: [1, 0.9] }, { duration: 1000, delay: index * 150, easing: [500, 20] })
      scene.addTo(controller)
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
  .animate.scale {
    opacity: 0;
  }
}
</style>
