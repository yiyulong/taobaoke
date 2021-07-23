<template>
  <div class="container detailInfo">
    <ul class="dest">
      <template v-for="(item, index) of layoutDetailInfoList">
        <li :key="index" :class="['q-py-sm', $q.screen.lt.sm ? '' : 'row no-wrap justify-around items-center q-py-md', index%2 ? 'reverse' : '']">
          <div class="col-5 title">
            <div class="row no-wrap items-center">
              <div class="index">{{ index + 1 | formatNum }}</div>
              <div>
                <h5>{{ item.title }}</h5>
                <p>{{ item.subTitle }}</p>
              </div>
            </div>
            <ul class="row wrap">
              <li v-for="(desc, idx) of item.descArray" :key="index + '-' + idx" class="col-4">{{ desc }}</li>
            </ul>
          </div>
          <div class="image">
            <img class="animate" :src="item.imgUrl" :class="index%2 ? 'left' : 'right'" >
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import scrollReveal from 'scrollreveal'
import ScrollMagic from 'scrollmagic'
export default {
  name: 'DetailInfo',
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
    //   this.scrollReveal.reveal('.animate.right', {
    //     viewFactor: 0.5,
    //     distance: '200px',
    //     duration: 1200,
    //     origin: 'right',
    //     cleanup: true,
    //     mobile: false
    //     // reset: true
    //   })
    //   this.scrollReveal.reveal('.animate.left', {
    //     viewFactor: 0.5,
    //     distance: '200px',
    //     duration: 1200,
    //     origin: 'left',
    //     cleanup: true,
    //     mobile: false
    //     // reset: true
    //   })
    // }, 2000)
    const revealElements = document.querySelectorAll('.detailInfo .animate')
    const controller = new ScrollMagic.Controller()
    Array.from(revealElements).forEach(item => {
      const scene = new ScrollMagic.Scene({
        triggerElement: item,
        triggerHook: 0.9, // show, when scrolled 10% into view
        // duration: '80%', // hide 10% before exiting view (80% + 10% from bottom)
        offset: 50 // move trigger to center of element
        // reverse: false // only do once
      })
      scene.setClassToggle(item, 'active') // add class to reveal
      // scene.addIndicators() // add indicators (requires plugin)
      scene.addTo(controller)
    })
  },
  filters: {
    formatNum (val) {
      if (val < 10) {
        return '0' + val
      }
      return val
    }
  },
  data () {
    return {
      scrollReveal: scrollReveal()
    }
  }
}
</script>
<style lang="scss" scoped>
.detailInfo {
  .dest {
    .title {
      .index {
        color: #d0d0d0;
        font-size: 96px;
      }
      h5 {
        font-weight: normal;
        font-size: 30px;
        color: #ef8327;
      }
      p {
        font-size: 24px;
        color: #d0d0d0;
      }
      li {
        box-sizing: border-box;
        padding-left: 25px;
        font-size: 22px;
        background: url(~assets/icon-1.png) no-repeat left center;
      }
    }
    @media screen and (max-width: 1024px) {
      .title {
        .index {
          font-size: 56px;
        }
        h5 {
          font-weight: normal;
          font-size: 20px;
        }
        p {
          font-size: 14px;
        }
        li {
          font-size: 14px;
        }
      }
    }
    .image {
      img {
        max-width: 100%;
      }
    }
    .animate {
      opacity: 0;
      transition: all 1s ease-in-out;
      &.left {
        transform: translateX(-200px);
      }
      &.right {
        transform: translateX(200px);
      }
      &.active {
        opacity: 1;
        transform: none;
      }
    }
  }
}
</style>
