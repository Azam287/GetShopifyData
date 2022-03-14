<template>
  <span ref="trigger"></span>
</template>

<script>

require('intersection-observer');

export default {
  name: "TriggerLoad",
  props: {
    options: {
      type: Object,
      default() {
        return{
          root: null,
          threshold:"0",
        }
      }
    }
  },
  data() {
    return{
      observer: {}
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      this.handleIntersect(entries[0]);
    },this.options);

    this.observer.observe(this.$refs.trigger);
  },
  methods: {
    handleIntersect(entry) {
      if(entry.isIntersecting) this.$emit("triggerIntersected");
    },
  },
  beforeUnmount() {
    this.observer.disconnect();
  }
}
</script>

<style scoped>

</style>