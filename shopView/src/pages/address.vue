<template>
  <div id="address">
    <topBody/>
    <navTab :index="-1"/>
    <ul class="crumbs">
            <li>
                <router-link to="index">首页</router-link>
            </li>
            <li> > </li>
            <li>
                <router-link to="user">我的微动</router-link>
            </li>
            <li> > </li>
            <li>
                <router-link to="order">订单中心</router-link>
            </li>
    </ul>
    <div class="containe">
            <div class="sidebar">
                <h2>会员中心</h2>
                <ul>
                    <li>
                        <h3>
                            <router-link to="user">账户信息</router-link>
                        </h3>
                        <ul>
                            <li>
                                <router-link to="user">个人资料</router-link>
                            </li>
                            <li class="active">
                                <router-link to="address">管理收货地址</router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h3>
                            <router-link to="order">订单中心</router-link>
                        </h3>

                    </li>
                </ul>
            </div>
            <div class="main">
                <div class="add_button">
                    <a href="#add_addr">新增收货地址</a>
                    <span>您已创建
                        <span>{{addressList.length}}</span>个收货地址</span>
                </div>
                <div class="add_addr" id="add_addr">
                    <h3>添加收货地址</h3>
                    <div>
                        <div>
                            <label for="addruser"> *收货人：</label>
                            <input type="text" id="addruser" v-model="address_receiver" />
                            <span></span>
                        </div>
                        <div>
                            <label for="area">*所在地区：</label>
                            <input type="text" id="area" v-model="address_area" />
                            <span></span>
                        </div>
                        <div>
                            <label for="addr_details">*详细地址：</label>
                            <input type="text" id="addr_details" v-model="address_details" />
                            <span></span>
                        </div>
                        <div>
                            <label for="phone">*手机号码：</label>
                            <input type="text" id="phone" v-model="address_phone" />
                            <span></span>
                        </div>
                        <div>
                            <label for="tel"> 固定电话：</label>
                            <input type="text" id="tel" v-model="address_call_phone" />
                            <span></span>
                        </div>
                        <div>
                            <label for="email">邮箱：</label>
                            <input type="text" id="email" v-model="address_email" />
                            <span></span>
                        </div>
                        <button @click="saveAddress" :disabled="!isCanSub">保存收货地址</button>
                    </div>
                </div>
                <ul class="addrs">
                    <li :class="{default:item.address_default}" v-for="(item,i) in addressList" :key="i">
                        <h4>{{item.address_receiver}}
                            <span>{{item.address_area}}</span>
                        </h4>
                        <ul>
                            <li>收货人：
                                <span>{{item.address_receiver}}</span>
                            </li>
                            <li>所在地区：
                                <span>{{item.address_area}}</span>
                            </li>
                            <li>地址：
                                <span>{{item.address_details}}</span>
                            </li>
                            <li>手机：
                                <span>{{item.address_phone}}</span>
                            </li>
                            <li>固定电话：
                                <span>{{item.address_call_phone}}</span>
                            </li>
                            <li>电子邮箱：
                                <span>{{item.address_email}}</span>
                            </li>
                        </ul>
                        <button @click="removeAddress(item.address_id,i)">
                            <img src="../assets/images/close_icon.png" />
                        </button>
                        <span @click="editAddress(item.address_id,i)" class="edit">编辑</span>
                        <span @click="setDefault(item.address_id,i)" class="default">设为默认</span>
                    </li>
                </ul>
            </div>
            <ul class="page">
            </ul>
        </div>
  </div>
</template>

<script>
import topBody from "@/components/topBody";
import navTab from "@/components/navTab";
import { imgServer } from "@/utils/config";
export default {
  components: {
    topBody,
    navTab
  },
  data(){
    return {
      addressList: [],
            address_receiver: '',
            address_area: '',
            address_details: '',
            address_phone: '',
            address_call_phone: '',
            address_email: '',
            editAddressId: undefined,
            addressIndex: undefined
    }
  },
    computed: {
            isCanSub: function () {
                if (this.address_receiver !== '' && this.address_area !== '' && this.address_details !== '' && this.address_phone !== '' && (/^1[34578]\d{9}$/.test(this.address_phone))) {
                    return true;
                }
                return false;
            }
        },
        mounted: function (res) {
            this.getAddressList();
            (function () {
                // 添加地址时表单验证
                // 收件人
                $('#addruser').focus(function () {
                    $(this).parent().find('span').html('');
                });
                $('#addruser').blur(function () {
                    var value = $.trim($(this).val());
                    if (value == "") {
                        $(this).parent().find('span').html('输入不能为空！');
                    }
                });
                // 所在地区
                $('#area').focus(function () {
                    $(this).parent().find('span').html('');
                });
                $('#area').blur(function () {
                    var value = $.trim($(this).val());
                    if (value == "") {
                        $(this).parent().find('span').html('输入不能为空！');
                    }
                });
                // 详情地址
                $('#addr_details').focus(function () {
                    $(this).parent().find('span').html('');
                });
                $('#addr_details').blur(function () {
                    var value = $.trim($(this).val());
                    if (value == "") {
                        $(this).parent().find('span').html('输入不能为空！');
                    }
                });
                // 手机号码
                $('#phone').focus(function () {
                    $(this).parent().find('span').html('');
                });
                $('#phone').blur(function () {
                    var value = $.trim($(this).val());
                    if (value == "") {
                        $(this).parent().find('span').html('输入不能为空！');
                    } else if (!(/^1[34578]\d{9}$/.test(value))) {
                        $(this).parent().find('span').html('手机号码输入有误！');
                    }
                });
                // 邮箱
                $('#email').focus(function () {
                    $(this).parent().find('span').html('');
                });
                $('#email').blur(function () {
                    var value = $.trim($(this).val());
                    if (value == "") return;
                    if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
                        $(this).parent().find('span').html('邮箱地址输入有误！');
                    }
                });
            })()
        },
        methods: {
            getAddressList: function () {
                var that = this;
                this.$api.get('/getAddressList', null, function (res) {
                    that.addressList = res.data;
                    var addressIndex = that.$route.query.addressIndex
                    if (addressIndex !== undefined) {
                        that.addressIndex = addressIndex;
                        that.editAddressId = that.addressList[addressIndex].address_id
                        that.address_receiver = that.addressList[addressIndex].address_receiver;
                        that.address_area = that.addressList[addressIndex].address_area;
                        that.address_details = that.addressList[addressIndex].address_details;
                        that.address_phone = that.addressList[addressIndex].address_phone;
                        that.address_call_phone =that.addressList[addressIndex].address_call_phone;
                        that.address_email = that.addressList[addressIndex].address_email;
                    }
                })
            },
            removeAddress: function (addressId, i) {
              var that = this;
              this.$confirm('确定删除收货地址？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(action=>{
                this.$api.post('/delAddress', {
                        addressId: addressId
                    }, function (res) {
                        that.addressList.splice(i, 1)
                    })
              }).catch(()=>{})
            },
            editAddress: function (addressId, i) {
                this.address_receiver = this.addressList[i].address_receiver;
                this.address_area = this.addressList[i].address_area;
                this.address_details = this.addressList[i].address_details;
                this.address_phone = this.addressList[i].address_phone;
                this.address_call_phone = this.addressList[i].address_call_phone;
                this.address_email = this.addressList[i].address_email;
                location.href = "#add_addr"
                this.editAddressId = addressId
                this.addressIndex = i

            },
            setDefault: function (addressId, i) {
                var that = this;
                this.$api.post("/setDefault", {
                    addressId: addressId,
                    address_default: true
                }, function (res) {
                    that.addressList.forEach(function (item) {
                        item.address_default = false
                    })
                    that.addressList[i].address_default = true
                })
            },
            saveAddress: function () {
                if (!this.isCanSub) {
                    return
                }
                var that = this;
                var addressObj = {
                    address_receiver: this.address_receiver,
                    address_area: this.address_area,
                    address_details: this.address_details,
                    address_phone: this.address_phone,
                    address_call_phone: this.address_call_phone,
                    address_email: this.address_email
                }
                if (this.editAddressId === undefined) {
                    this.$api.post("/addAddress", addressObj,  (res) =>{
                        var orderPro = that.$route.query.orderPro;
                        if (!!orderPro) {
                            that.$router.push({
                              name:'confirm_order',
                              query:{
                                isGoToBug:!!this.$route.query.isGoToBug,
                                orderPro:orderPro
                              }
                            });
                        } else {
                            that.addressList.push(addressObj)
                            that.initAddress();
                            that.$alert("收货地址添加成功", "成功提示", {
                              type: "success",
                            });
                        }
                    })
                } else {
                    addressObj.address_id = this.editAddressId
                    this.$api.post("/updateAddress", addressObj, function (res) {
                        that.addressList[that.addressIndex].address_receiver = addressObj.address_receiver
                        that.addressList[that.addressIndex].address_area = addressObj.address_area
                        that.addressList[that.addressIndex].address_details = addressObj.address_details
                        that.addressList[that.addressIndex].address_phone = addressObj.address_phone
                        that.addressList[that.addressIndex].address_call_phone = addressObj.address_call_phone
                        that.addressList[that.addressIndex].address_email = addressObj.address_email
                        that.initAddress();
                        that.$alert('收货地址更新成功','成功提示',{
                          type:'success',
                          callback:()=>{
                            if(that.$route.query.addressIndex!==undefined){
                              that.$router.go(-1);
                            }
                          }
                        })
                    })
                }
            },
            initAddress: function () {
                this.address_receiver = '';
                this.address_area = '';
                this.address_details = '';
                this.address_phone = '';
                this.address_call_phone = '';
                this.address_email = '';
            }
        }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variable.scss";
#address {
  background-color: #fff;
}
.containe {
  overflow: hidden;
  margin-bottom: 28px;
  .sidebar {
        width: 168px;
        float: left;
        margin-right: 10px;
        background-color: $proBottomBgColor;
        h2 {
            background-color: $activeBgColor;
            width: 168px;
            height: 66px;
            display: block;
            width: 100%;
            text-align: center;
            line-height: 66px;
            color: #fff;
            font-size: $navClassifyH3FontSize;
        }
        >ul {
            width: 168px;
            background-color: #000;
            padding-top: 28px;
            padding-bottom: 1px;
            a {
                color: #fff;
                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
            }
            >li {
                margin-bottom: 28px;
                .active {
                    background-color: $activeBgColor;
                }
                h3 {
                    height: 25px;
                    a {
                        line-height: 25px;
                        display: block;
                        font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
                        color: #fff;
                        padding-left: 22px;
                        width: 146px;
                        height: 100%;
                    }
                }
                h3:hover {
                    background-color: $activeBgColor;
                }
                >ul {
                    li {
                        height: 25px;
                        line-height: 25px;
                        a {
                            display: block;
                            padding-left: 22px;
                            line-height: 25px;
                            width: 146px;
                            height: 100%;
                        }
                    }
                    li:hover {
                        background-color: $activeBgColor;
                    }
                }
            }
        }
    }
    .main {
        width: 1020px;
        float: left;
        border: 1px solid $topAndFooterBgColor;
        .add_button {
            margin: 25px 0 22px 28px;
            line-height: 35px;
            >a {
                display: inline-block;
                cursor: pointer;
                height: 35px;
                line-height: 35px;
                width: 147px;
                text-align: center;
                color: #fff;
                font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
                font-weight: bold;
                background-color: $activeBgColor;
            }
            >span {
                color: $topAndNavColor;
                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                margin-left: 20px;
            }
        }
        #add_addr {
            width: 960px;
            margin-left: 28px;
            border: 1px solid #E5E5E5;
            padding: 15px 0 26px 0;
            >h3 {
                color: #222;
                font-size: $proH4AndbottomH4AndDtAndServiceFontSize;
                font-weight: bold;
                margin-left: 24px;
            }
            >div {
                >div {
                    margin-top: 10px;
                    overflow: hidden;
                    label {
                        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                        color: $topAndNavColor;
                        line-height: 27px;
                        text-align: right;
                        display: block;
                        float: left;
                        width: 80px;
                    }
                    input {
                        height: 25px;
                        border: 1px solid #b5b5b5;
                        color: $topAndNavColor;
                        padding-left: 5px;
                        display: block;
                        float: left;
                    }
                    >span {
                        color: $activeBgColor;
                        font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                        margin-left: 10px;
                    }
                    #addruser {
                        width: 157px;
                    }
                    #area {
                        width: 190px;
                    }
                    #addr_details {
                        width: 392px;
                    }
                    #phone,
                    #tel {
                        width: 182px;
                    }
                    #email {
                        width: 295px;
                    }
                }
                >button {
                    font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                    color: #fff;
                    height: 27px;
                    width: 157px;
                    line-height: 27px;
                    text-align: center;
                    background-color: $activeBgColor;
                    margin: 24px 0 0 21px;
                    cursor: pointer;
                    &:disabled{
                        opacity: 0.5;
                    }
                }
            }
        }
        .addrs {
            padding-bottom: 20px;
            >li {
                border: 1px solid #E5E5E5;
                width: 937px;
                margin: 14px 0 0 28px;
                padding: 15px 0 0 23px;
                font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                position: relative;
                h4 {
                    color: #222;
                    font-weight: bold;
                }
                ul {
                    margin-top: 18px;
                    padding-bottom: 10px;
                    li {
                        height: 25px;
                        line-height: 25px;
                        color: $topAndNavColor;
                    }
                }
                button {
                    position: absolute;
                    top: 5px;
                    right: 9px;
                    cursor: pointer;
                    background-color: transparent;
                }
                .edit,
                .default {
                    position: absolute;
                    color: #1d8298;
                    font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
                    cursor: pointer;
                    right: 30px;
                    bottom: 11px;
                }
                .default {
                    right: 100px;
                }
            }
            >li.default{
                span.default{
                    display: none;
                }
            }
        }
        >div:last-of-type {
            margin-top: 28px;
            margin-bottom: 26px;
            button {
                background-color: #D72828;
            }
        }
    }
    .page {
        float: right;
        margin: 20px 28px 29px 0;
        li {
            float: left;
            margin: 0 6px;
        }
        .on {
            a {
                color: $activeBgColor;
            }
        }
        li:hover {
            a {
                color: $activeBgColor;
            }
        }
        a {
            font-size: $navClassifyLiAndproSpanAndDlAndTimeFontSize;
        }
    }
}
</style>
