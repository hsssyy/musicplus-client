<template>
    <div class="content">
      <div class="often-content">
        <ul class="often-package">
            <li @click="isMealActive">
                <p>√</p>
                <div style="pointer-events: none">
                    <div>{{total1}} </div> 元<br/>
                    15元/月
                    <hr/>
                </div>
                <div class="month-select" style="pointer-events: none">
                    <span class="month-sub" style="pointer-events: auto" @click="monthSub">-</span>
                    <span class="month">{{months1}}个月</span>
                    <span class="month-add" style="pointer-events: auto" @click="monthAdd">+</span>
                </div>
            </li>
            <li @click="isMealActive">
                <p>√</p>
                <div style="pointer-events: none">
                    <div>{{total2}} </div> 元<br/>
                    15元/月
                    <hr/>
                    <span >{{months2}}个月</span>
                </div>
            </li>
            <li @click="isMealActive">
                <p>√</p>
                <div style="pointer-events: none">
                    <div>{{total3}} </div> 元<br/>
                    15元/月
                    <hr/>
                    <span >{{months3}}个月</span>
                </div>
            </li>
            <li @click="isMealActive">
                <p>√</p>
                <div style="pointer-events: none">
                    <div>{{total4}} </div> 元<br/>
                    14元/月
                    <hr/>
                    <span >{{months4}}个月</span>
                </div>
            </li>
        </ul>
        <div class="pay">
            <ul class="pay-way">
                <li @click="isPayActive">
                    <p>√</p>
                    微信支付
                </li>
                <li @click="isPayActive">
                    <p>√</p>
                    支付宝支付
                </li>
            </ul>
            <br/>
            <el-button type="primary" class="pay-btn" @click="confirmPay">确认支付</el-button>
        </div>
    </div>
    </div>
  </template>
  <script>
import { mixin } from "../mixins";
export default {
    name: "vip-content",
    data(){
        return {
            flag1: '',   //判断是否选中
            flag2: '',
            months1: '1',//套餐一 加减选择月数 
            months2: '3',//套餐二 月数
            months3: '6',//套餐三 月数
            months4: '12',//套餐四 月数
            total1:'15', //套餐一总额
            total2:'45', //套餐二总额
            total3:'90', //套餐三总额
            total4:'168', //套餐一四总额
        }
    },
    mixins: [mixin],    
    mounted() {
        // 点击套餐显示选中边框
        var lis1 = document.querySelector(".often-package").childNodes;
        for (var i = 0; i < lis1.length; i++) {
            lis1[i].addEventListener("click", function (e) {
                for (var i = 0; i < lis1.length; i++) {
                    lis1[i].className = '';
                }
                this.className = 'sel-active';
                e.stopPropagation();
            })
        };
        // 点击支付方式显示选中边框
        var lis2 = document.querySelector(".pay-way").childNodes;
        for (var i = 0; i < lis2.length; i++) {
            lis2[i].addEventListener("click", function (e) {
                for (var i = 0; i < lis2.length; i++) {
                    lis2[i].className = '';
                }
                this.className = 'cek-active';
                e.stopPropagation();
            })
        };
    },
    methods:{
        //提示信息
        notify(title, type) {
            this.$notify({
                title: title,
                type: type
            })
        },
        isMealActive(e) {
            this.flag1 = true;
            console.log(e.target);
            e.stopPropagation();
        },
        isPayActive(e) {
            this.flag2 = true;
            console.log(e.target);
            e.stopPropagation();
        },
        monthSub(e) {
            if (this.months1 <= 1) {
                this.months1 = 1;
                this.total1 = 15;
            } else {
                this.months1--;
                this.total1 = 15 * this.months1;
            }
            e.stopPropagation();
        },
        monthAdd(e) {
            if (this.months1 >= 12) {
                this.months1 = 12;
                this.total1 = 15 * this.months1;
            } else {
                this.months1++;
                this.total1 = 15 * this.months1;
            }
            e.stopPropagation();
        },
        confirmPay(e) {
            e.stopPropagation();
            if (this.flag1 && this.flag2) {
                this.notify("开通会员成功",'success');
            } else if ((this.flag1 == false) && this.flag2) {
                this.notify("请选择套餐",'warning');
            } else if (this.flag1 && (this.flag2 == false)) {
                this.notify("请选择支付方式",'warning');
            } else if ((this.flag1 == false) && (this.flag2 == false)) {
                this.notify("请选择套餐与支付方式",'warning');
            }
            // console.log(this.flag1);
            
        },
    }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/vip-content.scss";
</style>
