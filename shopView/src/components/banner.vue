<template>
  <div class="wrapper" id="wrapper">
            <div class="banner">
                <ul>
                    <li v-for="(item,i) in bannerList" :key="i">
                        <a :href="'pro_details.html?proId='+item.proId"><img :src="imgServer+item.imgUrl" /></a>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script>
export default {
  data(){
    return {
      bannerList:[
        {
          proId:1,
          imgUrl:require('../assets/images/banner1.png')
        },
        {
          proId:2,
          imgUrl:require('../assets/images/banner2.png')
        },
        {
          proId:3,
          imgUrl:require('../assets/images/banner3.png')
        }
      ],
      imgServer:'',

    }
  }
}
</script>

<style lang="scss">
$activeBgColor:#B90101;
.imgblock {
    display: block;
}
.wrapper {
        height: 600px;
        width: 100%;
        overflow: hidden;
        position: relative;
        z-index: 1;
        margin-bottom: 100px;
        .banner {
            width: 1920px;
            position: absolute;
            ul {
                z-index: 2;
                position: relative;
                li {
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: none;
                }
                li:first-child {
                    display: block;
                }
            }
            img {
                width: 100%;
                @extend .imgblock;
            }
            ol {
                position: absolute;
                width: 75px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                top: 570px;
                margin: 0 auto;
                z-index: 2;
                li {
                    list-style: none;
                    width: 15px;
                    height: 15px;
                    margin: 0 5px;
                    float: left;
                    -webkit-border-radius: 15px;
                    -moz-border-radius: 15px;
                    -ms-border-radius: 15px;
                    -o-border-radius: 15px;
                    border-radius: 15px;
                    background-color: #999999;
                    cursor: pointer;
                }
                li:hover,
                li.active {
                    background-color: $activeBgColor;
                }
            }
        }
    }
</style>
