<template>
  <div class="container">
    <ul class="row wrap items-stretch">
      <template v-for="(item, index) of layoutDetailInfoList">
        <li class="col-6 col-sm-3" :key="index" :style="{order: index%2 == 0 ? index : index }">
          <div class="full-height row justify-center items-center bg-grey-2">
            <template v-if="item.imgUrl">
              <q-img :src="item.imgUrl" :ratio="4/3" />
            </template>
            <template v-else>
              <div>
                <h6 :class="$q.screen.lt.md ? 'text-subtitle2' : ''">{{ item.title }}</h6>
                <q-separator :size="$q.screen.lt.md ? '1px' : '2px'" color="dark" spaced="sm" />
                <div :class="$q.screen.lt.md ? 'text-caption line-height1' : ''">
                  <p v-for="(desc, idx) of item.descArray" :key="`${index}-${idx}`">{{ desc }}</p>
                </div>
              </div>
            </template>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'DetailDesc',
  props: {
    layoutDetailInfoList: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.line-height1 {
  line-height: 1rem;
}
</style>
