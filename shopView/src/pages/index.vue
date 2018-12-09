<template>
  <div id="index">
    <topBody/>
    <navTab/>
    <banner/>
    <div class="new_goods">
            <ul>
                <li v-for="(pro,i) in proList" :key="i">
                    <router-link :to="{name:'pro_details',query:{proId:pro.goods_id}}"><img :src="imgServer+pro.goods_img[0]" alt=""></router-link>
                    <div>
                        <h4>
                          <router-link :to="{name:'pro_details',query:{proId:pro.goods_id}}">{{pro.goods_name}}</router-link>
                        </h4>
                        <p class="market_price">￥ 市场价：<span>{{pro.goods_marketPrice}}</span></p>
                        <p class="member_price">￥ 会员价：<span>{{pro.goods_price}}</span></p>
                    </div>
                </li>
            </ul>
        </div>
  </div>
</template>

<script>
import topBody from "@/components/topBody";
import banner from "@/components/banner";
import navTab from "@/components/navTab";
import { imgServer } from "@/utils/config";
export default {
  components: {
    banner,
    navTab,
    topBody
  },
  data() {
    return {
      imgServer,
      proList: []
    };
  },
  mounted() {
    this.$api.get(
      "/public/getProList",
      {
        status: 1
      },
      res => {
        this.proList = res.data.list;
      }
    );
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
.new_goods {
  width: 1200px;
  margin: 100px auto 0 auto;
  position: relative;
  background-color: $proBoxBgColor;
  border-radius: 10px;
  padding: 9px 0 9px 9px;
  border: 3px solid #fcbec0;
  margin-bottom: 124px;
  ul {
    border-radius: 10px;
    padding: 11px 0;
    padding-left: 12px;
    width: 1180px;
    background-color: #fff;
    overflow: hidden;
    li {
      float: left;
      border: 1px solid $topAndFooterBgColor;
      border-color: #ccc;
      width: 291px;
      a {
        display: block;
        width: 100%;
      }
      img {
        width: 291px;
        height: 291px;
        margin: 0 auto;
        display: block;
      }
      div {
        background-color: $proBottomBgColor;
        width: 100%;
        height: 120px;
        border-top: 1px solid $topAndFooterBgColor;
        color: $topAndNavColor;
        h4 {
          margin-top: 6px;
          padding:0 10px;
          > a {
            font-weight: normal;
            color: $topAndNavColor;
            font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
          }
        }
        .market_price,
        .member_price {
          font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
          margin-bottom: 3px;
          padding:0 10px;
        }
        .member_price {
          color: $activeBgColor;
          span {
            font-weight: bolder;
          }
        }
      }
    }
    li:hover {
      border-color: $activeBgColor;
      h4 {
        > a {
          color: #fffefe;
        }
      }
      div {
        background-color: $activeBgColor;
        border-color: $activeBgColor;
        .market_price,
        .member_price {
          color: #fffefe;
        }
      }
    }
  }
}
</style>
