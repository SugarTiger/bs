<template>
  <div id="app">
    <shopTop ref="shopTop"/>
    <router-view/>
    <shopFooter/>
  </div>
</template>

<script>
import shopTop from "@/components/top";
import shopFooter from "@/components/footer";
export default {
  name: 'App',
  components: {
    shopTop,
    shopFooter
  }
}
</script>
