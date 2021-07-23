<template>
  <ul class="container">
    <li v-for="(src, index) of srcs" :key="index">
      <img class="full-width" :src="src" />
    </li>
  </ul>
</template>
<script>
export default {
  name: 'DetailImgs',
  props: {
    bgUrl: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      srcs: [this.bgUrl]
    }
  }
}
</script>
