<template>
  <q-page>
    <div class="column no-wrap">
      <template v-for="info of layoutInfo">
        <index-container :info="info" :key="info.id" :style="'order:' + info.orderno">
          <template v-if="isComponents(info.showType)">
            <component :is="isComponents(info.showType)" v-bind="info" />
          </template>
        </index-container>
      </template>
    </div>
  </q-page>
</template>
<script>
import { ShowType, isComponents } from '../components/ShowType'
import { searchLayoutInfo } from '../api'
import IndexContainer from '../components/IndexContainer.vue'
export default {
  name: 'IndexPage',
  components: {
    IndexContainer,
    ...ShowType
  },
  data () {
    return {
      slide: 0,
      layoutInfo: []
    }
  },
  created () {
    searchLayoutInfo(this.$attrs.layoutKey).then(res => {
      this.layoutInfo = res
    })
  },
  methods: {
    isComponents
  }
}
</script>
<style lang="scss" scope>
</style>
