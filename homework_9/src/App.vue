<template>

  <transition name="anim" mode="out-in">

  <router-view>

  </router-view>

  </transition>

</template>

<script>

export default {
  name: 'App',
  mounted(){
    this.$store.dispatch("getContacts");
  }

}
</script>

<style>
@font-face {
    font-family: 'prettyFont'; /*a name to be used later*/
    src: url("./assets/pretty_font.ttf"); /*URL to font*/
}
*{
    font-family: 'prettyFont'; /*a name to be used later*/
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
a{
  text-decoration: none;
  color: inherit;
}
#app {
  margin-top: 10px;
  /*font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
.btn{
        padding: 3px;
        border: 1px solid gray;
        border-radius: 5px;
        transition: all .3s ease-out;
    }

    .btn:hover{
        cursor: pointer;
        background-color: rgba(50, 50, 50, 0.48);
        color: seashell;
        transition: all .3s ease-in;
    }
.anim-enter-active, .anim-leave-active {
 transition: opacity 2.2s ease-in-out;
}
.anim-enter-from, .anim-leave-to {
  opacity: 0;
}
</style>
