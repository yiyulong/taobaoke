<template>
  <div class="news-page">
    <div class="row no-wrap justify-between q-my-sm">
      <div></div>
      <div class="q-pa-sm">
        <q-btn-toggle
          dense
          size="sm"
          v-model="model"
          toggle-color="primary"
          text-color="grey"
          :options="[
            {value: 'card', slot: 'card' },
            {value: 'list', slot: 'list' }
          ]"
        >
          <template v-slot:card>
            <div class="row items-center no-wrap">
              <q-icon name="r_view_module" />
              <div class="text-center">
                卡片
              </div>
            </div>
          </template>
          <template v-slot:list>
            <div class="row items-center no-wrap">
              <q-icon name="r_list" />
              <div class="text-center">
                列表
              </div>
            </div>
          </template>
        </q-btn-toggle>
      </div>
    </div>
    <q-separator />
    <q-pull-to-refresh @refresh="refresh">
      <q-infinite-scroll ref="qInfiniteScroll" @load="onLoad" :offset="250">
        <div class="q-my-md q-px-sm">
          <template v-if="model === 'card'">
            <ul class="row wrap items-stertch q-col-gutter-md">
              <li v-for="(news, index) in newsList" :key="index" class="col-6 col-sm-4 animate zoomIn">
                <q-card class="column cursor-pointer full-height my-card" @click="selectedNews(news)">
                  <q-img :src="news.coverUrl" :ratio="16/9" />
                  <q-card-section class="q-pb-none">
                    <div class="q-text-h6 ellipsis-2-lines">{{ news.title }}</div>
                  </q-card-section>
                  <q-space />
                  <q-card-section>
                    <div class="text-caption text-grey">{{ news.createDate }}</div>
                  </q-card-section>
                </q-card>
              </li>
            </ul>
          </template>
          <template v-else>
            <ul class="q-px-sm">
              <li v-for="(news, index) in newsList" :key="index" class="animate slideInUp" :class="$q.screen.lt.sm ? 'q-my-sm' : 'q-my-md'">
                <q-card class="my-card">
                  <q-card-section horizontal class="cursor-pointer items-stertch" @click="expandedNews(index)">
                    <q-card-section class="q-pr-none row items-center">
                      <q-img :style="{ width: $q.screen.lt.sm ? '120px' : '200px' }" :src="news.coverUrl" :ratio="16/9" />
                    </q-card-section>
                    <q-card-section class="q-pa-none col column">
                      <q-card-section class="q-pb-none">
                        <div class="q-text-h6 ellipsis-2-lines">{{ news.title }}</div>
                      </q-card-section>
                      <q-space />
                      <q-card-section>
                        <div class="row no-wrap justify-between items-center">
                          <span class="text-caption text-grey">{{ news.createDate }}</span>
                          <q-icon :name="news.expanded ? 'r_expand_less' : 'r_expand_more'" color="grey" size="xs" />
                        </div>
                      </q-card-section>
                    </q-card-section>
                  </q-card-section>
                  <q-slide-transition>
                    <div v-show="news.expanded">
                      <q-separator />
                      <q-card-section class="text-subitle2">
                        <div v-html="news.content" />
                      </q-card-section>
                      <q-card-actions align="center">
                        <q-btn flat dense class="col" color="grey" icon-right="r_expand_less" @click="expandedNews(index)">收起</q-btn>
                      </q-card-actions>
                    </div>
                  </q-slide-transition>
                </q-card>
              </li>
            </ul>
          </template>
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-pull-to-refresh>
    <q-dialog v-model="fixed">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6 ellipsis">{{ activeNews.title }}</div>
          <div class="text-caption text-grey">{{ activeNews.createDate }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 80vh; min-height: 60vh;" class="scroll">
          <div v-html="activeNews.content" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { searchNewsList } from '../api'
import scrollReveal from 'scrollreveal'
export default {
  name: 'NewsPage',
  data () {
    return {
      scrollReveal: scrollReveal(),
      offset: 0,
      limit: 20,
      newsList: [],
      model: 'card',
      fixed: false,
      activeNews: {}
    }
  },
  created () {
    // this.getList()
  },
  mounted () {
    // this.getList()
    // this.scrollAnimate()
  },
  methods: {
    scrollAnimate () {
      let target = '',
        options = {}
      if (this.model === 'card') {
        target = '.animate.zoomIn'
        options = {
          viewFactor: 0.5,
          scale: 0.9,
          duration: 1200
          // cleanup: true
          // reset: true
        }
      } else {
        target = '.animate.slideInUp'
        options = {
          viewFactor: 0.5,
          distance: '100px',
          interval: 200,
          duration: 1200,
          origin: 'bottom'
          // cleanup: true
          // reset: true
        }
      }
      // scrollReveal().reveal(target, options)
      this.scrollReveal.reveal(target, options)
    },
    async refresh (done) {
      console.log('refresh')
      this.offset = 0
      this.$refs.qInfiniteScroll.reset()
      // this.$refs.qInfiniteScroll.trigger()
      // this.$refs.qInfiniteScroll.resume()
      await this.getList()
      done()
    },
    async onLoad (index, done) {
      console.log('onLoad', index)
      // this.offset = index
      this.offset = (index - 1) * this.limit
      await this.getList()
      done()
    },
    async getList () {
      console.log('getList')
      const params = {
        offset: this.offset,
        limit: this.limit
      }
      const res = await searchNewsList(params)
      if (this.offset === 0) {
        this.newsList = res
      } else {
        this.newsList.push(...res)
      }
      if (this.limit > res.length) {
        this.$refs.qInfiniteScroll.stop()
      }
      // scrollReveal().sync()
      // setTimeout(() => {
      //   this.scrollReveal.sync()
      // }, 5000)
      // this.scrollReveal.sync()
      // this.scrollAnimate()
      // setTimeout(() => {
      //   this.scrollAnimate()
      //   // this.scrollReveal.sync()
      // }, 0)
      // this.$nextTick(() => {
      //   this.scrollAnimate()
      // })
    },
    expandedNews (index) {
      this.newsList[index].expanded = !this.newsList[index].expanded
      this.$set(this.newsList, index, this.newsList[index])
    },
    selectedNews (target) {
      this.fixed = true
      this.activeNews = target
    }
  }
}
</script>
<style lang="scss" scoped>
.news-page {
  max-width: 960px;
  margin: 0 auto;
  .my-card:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.14), 0 3px 1px -4px rgba(0, 0, 0, 0.12);
    // transform: translateY(-2px);
    transition: all .3s;
  }
}
</style>
