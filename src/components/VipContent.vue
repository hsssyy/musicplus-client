<template>
    <div class="content">
      <div class="often-content">
        <ul class="often-package">
            <li @click="isMealActive('1')">
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
            <li @click="isMealActive('2')">
                <p>√</p>
                <div style="pointer-events: none">
                    <div>{{total2}} </div> 元<br/>
                    15元/月
                    <hr/>
                    <span >{{months2}}个月</span>
                </div>
            </li>
            <li @click="isMealActive('3')">
                <p>√</p>
                <div style="pointer-events: none">
                    <div>{{total3}} </div> 元<br/>
                    15元/月
                    <hr/>
                    <span >{{months3}}个月</span>
                </div>
            </li>
            <li @click="isMealActive('4')">
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
import {mapGetters} from 'vuex';
import {setVip} from '../api/index';
import {getUserOfId} from '../api/index';
export default {
    name: "vip-content",
    mixins: [mixin],
    computed:{
        ...mapGetters([
            'userId', //当前登录用户id
        ])
    },
    /* 套餐一：可选择月数，最高12个月---金额随月数变化---15元/月
       套餐二：3个月---金额45元---15元/月
       套餐三：6个月---金额90元---15元/月
       套餐四：12个月---金额168元---14元/月
    */
    data(){
        return {
            flag1: '',       //判断是否选中套餐
            flag2: '',       //判断是否选中支付方式
            months1: '1',    //套餐一 加减选择月数 
            months2: '3',    //套餐二 月数
            months3: '6',    //套餐三 月数
            months4: '12',   //套餐四 月数
            total1:'15',     //套餐一 总额
            total2:'45',     //套餐二 金额
            total3:'90',     //套餐三 金额
            total4:'168',    //套餐四 金额
            selectMonth: '', //选择的月数，默认空
            payAmount: '',   //付款金额，默认空
            duedate: '',     //会员到期时间
        }
    },
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
        isMealActive(val) {
            if (val == 1){ // 选择的是套餐一
                this.selectMonth = this.months1; // 开通的月数
                this.payAmount = this.total1; // 支付总金额
            } else if (val == 2) { // 套餐二
                this.selectMonth = this.months2;
                this.payAmount = this.total2;
            } else if (val == 3) { // 套餐三
                this.selectMonth = this.months3;
                this.payAmount = this.total3;
            } else if (val == 4) { // 套餐四
                this.selectMonth = this.months4;
                this.payAmount = this.total4;
            }
            this.flag1 = true;
            // e.stopPropagation();
        },
        isPayActive(e) {
            this.flag2 = true;
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
        confirmPay(e) { // 确认支付
            e.stopPropagation();
            if (this.flag1 && this.flag2) { //套餐与支付方都选择了
                // ----------根据用户id查询到期时间duedate----------
                getUserOfId(this.userId)
                    .then(res => {
                        this.duedate = res.duedate;
                    })
                    .catch( err=> {
                        this.notify("出错了","error");
                    })
                //--------------开通会员时间 yyyy-mm-dd--------------
                let nowTime = new Date();        // 当前系统时间
                let y1 = nowTime.getFullYear();  //年
                let m1 = nowTime.getMonth() + 1; //月
                m1 = m1 < 10 ? '0' + m1 : m1;
                let d1 = nowTime.getDate();      //日
                d1 = d1 < 10 ? '0' + d1 : d1;
                let openTime = y1 + '-' + m1 + '-' + d1;
                //----------------计算到期时间-----------------------
                var dueMs = +new Date(this.duedate);     // 到期时间转化为毫秒数  dueMs
                let timeMs = +new Date();                // 开通会员时间的总毫秒数 timeMs
                let monMs = this.selectMonth * 31 * 24 * 60 * 60 * 1000; //月数*31天*24小时*60分钟*60秒*1000毫秒
                if (!dueMs || dueMs < timeMs) { // 到期时间为空 或者 到期时间小于开通时间（用毫秒判断）
                    // 到期时间 = 开通时间+开通的月数（用毫秒计算）
                    dueMs = timeMs + monMs;
                } else if (dueMs >= timeMs) { // 到期时间 大于等于 开通会员时间 
                    // 到期时间 = 数据库获取到的到期时间+开通的月数（用毫秒计算）
                    dueMs = dueMs + monMs;
                }
                //----------到期时间转化为年月日格式yyyy-mm-dd---------
                let due = new Date(dueMs);
                let y2 = due.getFullYear();  //年
                let m2 = due.getMonth() + 1; //月
                m2 = m2 < 10 ? '0' + m2 : m2;
                let d2 = due.getDate();      //日
                d2 = d2 < 10 ? '0' + d2 : d2;
                this.duedate = y2 + '-' + m2 + '-' + d2;
                // -----------------------------------------------
                let params = new URLSearchParams();
                params.append('userId', this.userId);           //用户id
                params.append('selectMonth', this.selectMonth); //开通的月数
                params.append('payAmount', this.payAmount);     //支付金额
                params.append('openTime', openTime);            //开通时间
                params.append('duedate', this.duedate);         //到期时间
                setVip(params)
                    .then(res =>{
                        if(res.code==1){
                            this.notify("开通会员成功",'success')
                        }else{
                            this.notify("开通会员失败",'error')
                        }
                    })
                    .catch(err =>{
                        this.notify("开通会员失败",'error')
                    })
            } else if ((this.flag1 == false) && this.flag2) {
                this.notify("请选择套餐",'warning');
            } else if (this.flag1 && (this.flag2 == false)) {
                this.notify("请选择支付方式",'warning');
            } else if ((this.flag1 == false) && (this.flag2 == false)) {
                this.notify("请选择套餐与支付方式",'warning');
            }
        },
    }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/vip-content.scss";
</style>
