<template>
  <div id="nav">
            <div class="containe">
                <div class="menu"></div>
                <ul class="subnav">
                    <li :class="{active:i===index}" v-for="(nav,i) in navList" :key="i">
                      <!-- <router-link :to="nav.to">{{nav.label}}</router-link> -->
                      <a href="javascript:void(0)" @click="toView(nav)">{{nav.label}}</a>
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
    },
    changeEvent:Boolean
  },
  data(){
    return {
      navList:[
        {
          label:'首页',
          to:'index',
          index:0
        },
        {
          label:'商品列表',
          to:{
            name:'shop_list',
            query:{
              type:'商品列表',
              index:1
            }
          }
        },
        {
          label:'亚瑟士',
          to:{
            name:'shop_list',
            query:{
              type:'亚瑟士',
          index:2
            }
          },
        },
        {
          label:'阿迪达斯',
          to:{
            name:'shop_list',
            query:{
              type:'阿迪达斯',
          index:3
            }
          },
        },
        {
          label:'耐克',
          to:{
            name:'shop_list',
            query:{
              type:'耐克',
          index:4
            }
          },
        },
      ]
    }
  },
  methods:{
    toView(nav){
      if(this.changeEvent){
        this.$emit('changeTab',nav)
      }else{
        this.$router.replace(nav.to)
      }
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
