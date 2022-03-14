<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div class="main-container">
    <HelloWorld class="table-container"/>
    <ToTopBtn />


  </div>


</template>

<script>


import HelloWorld from './components/HelloWorld.vue'
import ToTopBtn from "@/components/ToTopBtn";

export default {
  name: 'App',
  components: {
    ToTopBtn,
    HelloWorld
  },
  data: function() {
    return {
      test: 1,
      fab: false
    };
  },
  methods: {
    testChange() {
      this.test++;
    }
  }
}
</script>

<style>

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.main-container{
  display: flex;
  justify-content: center;
}

.table-container{
  width: 90%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
