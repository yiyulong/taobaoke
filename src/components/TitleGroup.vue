<template>
  <div class="title-group" :class="showType === 6 ? 'container': 'text-center'">
    <h3 class="q-mb-sm" :class="[showType === 6 ? 'text-h5 text-weight-bold': '', $q.screen.lt.md ? 'text-h6' : '']">
      <p class="no-margin q-pb-sm">{{ title }} </p>
    </h3>
    <p :class="['q-mb-md', subTitleClass]">{{ subTitle }}</p>
  </div>
</template>
<script>
export default {
  name: 'TitleGroup',
  props: {
    title: String,
    subTitle: String,
    showType: Number
  },
  computed: {
    subTitleClass () {
      let classStr = ''
      if (this.$q.screen.lt.md) {
        classStr = 'text-subtitle1'
      } else {
        classStr = 'text-h4'
        if (this.showType === 6) {
          classStr = 'text-h6'
        }
      }
      return classStr
    }
  }
}
</script>
<style lang="scss" scoped>
.title-group {
  > h3 p {
    display: inline-block;
    color: #ed8335;
    border-bottom: 2px solid currentColor;
  }
  // > p {
  //   font-size: 22px;
  // }
}
</style>
