<template>
  <div id="in_tbody">
            <div class="containe">
                <div class="logo">
                    <router-link to="index">
                        <img :src="logoImg" alt="商城logo">
                    </router-link>
                </div>
                <div>
                    <h1>
                        <router-link to="index">
                            <img src="../assets/images/logo_title.png" alt="">
                        </router-link>
                    </h1>
                    <div class="search">
                        <input type="text" name="search" placeholder="请输入关键字搜索" v-model="keyWord" @keyup.enter="searchPro">
                        <button @click="searchPro">搜索</button>
                    </div>
                </div>
                <div class="header_ad">
                  <router-link to="/shop_list"><img src="../assets/images/pro1.png" alt=""></router-link>
                  <router-link to="/shop_list"><img src="../assets/images/pro2.png" alt=""></router-link>
                </div>
            </div>
        </div>
</template>
<script>
export default {
  props:{
    searchEvent:Boolean
  },
  data() {
    return {
      keyWord: ""
    };
  },
  methods: {
    searchPro() {
      if(this.searchEvent){
        this.$emit("searchEvent",this.keyWord)
      }else{
        this.$router.push({
        name: "shop_list",
        query: {
          type: "商品列表",
          keyword: this.keyWord || undefined,
          index:1
        }
      });
      }

    }
  },
  computed: {
    logoImg() {
      return this.$store.state.shopInfo.info_logo || "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
#in_tbody {
  width: 100%;
  height: 160px;
  overflow: hidden;
  background-color: #FF5000;
  .logo {
    width: 160px;
    margin-right: 67px;
    >a{
      display: block;
    }
  }
  .containe{
    height: 100%;
    display: flex;
    align-items: center;
  }
  .containe > div:nth-of-type(2) {
    width: 405px;
  }
  .search {
    height: 33px;
    width: 397px;
    background-color: $activeBgColor;
    margin: 5px 0 0 5px;
    input {
      height: 26px;
      width: 317px;
      color: #b0b0b0;
      margin: 3px 0 0 3px;
      display: block;
      float: left;
      padding-left: 5px;
    }
    button {
      background-color: $activeBgColor;
      color: #fff;
      font-size: $navAndTitleAndSearchFontSize;
      line-height: 33px;
      height: 33px;
      width: 72px;
      cursor: pointer;
      display: block;
      float: left;
    }
  }
  .header_ad {
    float: right;
    a {
      display: block;
      float: left;
    }
    a:first-of-type {
      margin-top: -20px;
    }
    a:last-of-type {
      margin-top: 30px;
    }
  }
}
</style>
