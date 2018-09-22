<template>
  <div id="nav">
            <div class="containe">
                <div class="menu"></div>
                <ul class="subnav">
                    <li :class="{active:i===index}" v-for="(nav,i) in navList" :key="i">
                      <router-link :to="nav.to">{{nav.label}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
</template>
<script>
export default {
  props:{
    index:{
      type:Number,
      default:0
    }
  },
  data(){
    return {
      navList:[
        {
          label:'首页',
          to:'index',
        },
        {
          label:'商品列表',
          to:{
            name:'shop_list',
            query:{
              type:'商品列表'
            }
          },
        },
        {
          label:'炊具炖锅',
          to:{
            name:'shop_list',
            query:{
              type:'炊具炖锅'
            }
          },
        },
        {
          label:'厨房小电',
          to:{
            name:'shop_list',
            query:{
              type:'厨房小电'
            }
          },
        },
        {
          label:'爆款推荐',
          to:{
            name:'shop_list',
            query:{
              type:'爆款推荐'
            }
          },
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variable.scss';
#nav {
        width: 100%;
        height: 60px;
        background-color: $proBottomBgColor;
        font-family: $navAndClassifyFontFamily;
        .active {
            background-color: $activeBgColor;
            a {
                color: $navClassifyColor;
            }
        }
        .menu {
            float: left;
            height: 60px;
            width: 216px;
        }
        .subnav {
            float: left;
            height: 60px;
            margin-left: 55px - 38px;
            li {
                float: left;
                height: 60px;
                line-height: 60px;
                a {
                    font-size: $navAndTitleAndSearchFontSize;
                    display: block;
                    height: 100%;
                    padding: 0 39px 0 39px;
                }
            }
            li:hover {
                @extend .active;
                a {
                    color: $navClassifyColor;
                }
            }
        }
    }
</style>
