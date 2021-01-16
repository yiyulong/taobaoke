<template>
  <div class="container">
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
    setTimeout(() => {
      this.scrollReveal.reveal('.animate.right', {
        viewFactor: 0.5,
        distance: '200px',
        duration: 1200,
        origin: 'right',
        cleanup: true,
        mobile: false
        // reset: true
      })
      this.scrollReveal.reveal('.animate.left', {
        viewFactor: 0.5,
        distance: '200px',
        duration: 1200,
        origin: 'left',
        cleanup: true,
        mobile: false
        // reset: true
      })
    }, 2000)
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
}
</style>
