<template>
  <div class="container">
    <div v-html="description"></div>
  </div>
</template>
<script>
export default {
  name: 'RichText',
  props: {
    description: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>
