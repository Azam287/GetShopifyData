<template>
  <button class="getToTopButton" v-on:click="getToTop" v-show="scrollPx>300"><i class="fas fa-arrow-up"></i></button>
</template>

<script>

export default {
  name: "ToTopBtn",

  data: () => ({
    scrollPx: ""
  }),
  mounted() {
    window.addEventListener("scroll",this.handleScroll)
  },

  methods: {
    getToTop () {
      window.scroll({top:0, behavior:"smooth"});
    },
    handleScroll(){
      this.scrollPx = window.scrollY;
    }
  }
}
</script>

<style scoped>
.getToTopButton {
  position: fixed;
  bottom: 100px;
  right: 40px;
  /*border-radius: 100%;*/
  border: 0;
  box-shadow: 0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%);
  width: 47px;
  height: 47px;
  z-index: 1;
  vertical-align: middle;
  display: inline-block;
  overflow: hidden;
  -o-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
  margin: 10px;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
  background-color: #f44336 !important;
}

.getToTopButton i {
  font-size: 1.25rem;
  line-height: 47px;
  display: inline-block;
  width: inherit;
  text-align: center;
  color: #fff;
}

</style>