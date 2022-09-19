import { likeSongOfName, getCollectOfUserId, flagVip, songOfSongId } from "../api/index";
import { mapGetters } from "vuex";
export const mixin = {
    computed: {
        ...mapGetters([
            'loginIn', //用户是否已登录
            'userId', //当前登录用户的id
        ]),
    },
    data() {
        return {
            duedate: '', //会员到期时间
            songLists: [], //对当前页面需要展示的歌曲列表
        }
    },
    methods: {
        //提示信息
        notify(title, type) {
            this.$notify({
                title: title,
                type: type
            })
        },

        //获取图片地址
        attachImageUrl(srcUrl) {
            return srcUrl ? this.$store.state.configure.HOST + srcUrl : this.$store.state.configure.HOST + '/img/songPic/user.jpg';
        },
        //根据歌手名字模糊查询
        getSong() {
            if (!this.$route.query.keywords) {
                this.$store.commit('setListOfSongs', []);
                this.notify("您输入的内容为空", "warning");
            } else {
                likeSongOfName(this.$route.query.keywords).then(res => {
                    if (!res.length) {
                        this.$store.commit('setListOfSongs', []);
                        this.notify("系统暂无符合条件的歌曲", "warning");
                    } else {
                        console.log(res);
                        for (let item of res) {
                            getRankt(item.id); //歌曲id
                            console.log(item.id);
                        }
                        this.$store.commit('setListOfSongs', this.songLists);
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            var _this = this;
            //根据歌曲id获取歌曲信息
            function getRankt(id) {
                songOfSongId(id)
                    .then(res => {
                        _this.songLists.push(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        //获取名字前半部分--歌手名
        replaceFName(str) {
            let arr = str.split('-');
            return arr[0];
        },
        //获取名字后半部分--歌名
        replaceLName(str) {
            let arr = str.split('-');
            return arr[1];
        },
        //播放  这是前台实现的播放音乐。
        toplay: function(id, url, pic, index, name, lyric) {
            this.$store.commit('setId', id);
            this.$store.commit('setUrl', this.$store.state.configure.HOST + url);
            this.$store.commit('setPicUrl', this.$store.state.configure.HOST + pic);
            this.$store.commit('setListIndex', index);
            this.$store.commit('setTitle', this.replaceFName(name));
            this.$store.commit('setArtist', this.replaceLName(name));
            this.$store.commit('setLyric', this.parseLyric(lyric));
            this.$store.commit('setIsActive', false);
            if (this.loginIn) {
                getCollectOfUserId(this.userId)
                    .then(res => {
                        for (let item of res) {
                            if (item.songId == id) {
                                this.$store.commit('setIsActive', true);
                                break;
                            }
                        }
                    })
            }
        },
        // album-content的点击事件
        gotoplay: function(id, url, pic, index, name, lyric, setVip) {
            let _this = this;

            function play() {
                _this.$store.commit('setId', id);
                _this.$store.commit('setUrl', _this.$store.state.configure.HOST + url);
                _this.$store.commit('setPicUrl', _this.$store.state.configure.HOST + pic);
                _this.$store.commit('setListIndex', index);
                _this.$store.commit('setTitle', _this.replaceFName(name));
                _this.$store.commit('setArtist', _this.replaceLName(name));
                _this.$store.commit('setLyric', _this.parseLyric(lyric));
                _this.$store.commit('setIsActive', false);
                if (_this.loginIn) {
                    getCollectOfUserId(_this.userId)
                        .then(res => {
                            for (let item of res) {
                                if (item.songId == id) {
                                    _this.$store.commit('setIsActive', true);
                                    break;
                                }
                            }
                        })
                }
            }
            // 1.所点击的歌曲是否为vip歌曲
            if (setVip === 1) { //是vip歌曲
                // 2.判断是否登录
                if (!this.loginIn) { //未登录，不可以听
                    this.notify("VIP歌曲，请先登录", 'warning');
                }
                //已登录，根据用户id判断是不是会员

                function getDuedate(userId, duedate) {
                    flagVip(userId).then(res => {
                        if (res.code == 1) {
                            duedate = res.vipMsg.endTime;
                        } else {
                            duedate = '';
                        }
                        getdate(duedate);
                    })
                }
                getDuedate(this.userId, this.duedate);

                function getdate(duedate) {
                    let dueMs = +new Date(duedate); // 到期时间转为毫秒
                    let openMs = +new Date(); // 当前时间的毫秒数
                    if ((!dueMs) || (dueMs < openMs)) { // 不是会员
                        _this.notify("VIP歌曲，请先开通会员", 'warning');
                    } else { // 是会员
                        play();
                    }
                }
            } else if (setVip === 0) {
                play();
            }
        },

        //解析歌词
        parseLyric(text) {
            let lines = text.split("\n"); //将歌词text按行（根据换行符号）分解成数组lines
            let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g; //时间格式的正则表达式（匹配两位数字：匹配两位数字.匹配两位或三位数字）
            let result = []; //返回值
            //对于歌词格式不对的直接返回
            if (!(/\[.+\]/.test(text))) { //判断歌词时间是否有中括号
                return [
                    [0, text] //直接显示歌词，不作处理
                ];
            }
            //去掉前面格式不正确的行，从第一个格式正确的开始
            while (!pattern.test(lines[0])) { // 第一行不满足时间格式，从第二行开始（循环）
                lines = lines.slice(1); //slice从数字索引为1开始取 到最后——>得到新数组 ——>循环
            }
            //遍历每一行，形成一个每行带着两个元素的数组，第一个元素是秒计算单位的时间，第二个元素是歌词
            for (let item of lines) {
                let time = item.match(pattern); //存前面的时间段，得到的是数组
                let value = item.replace(pattern, ''); //存后面的歌词，遇到中括号格式的就为空 得到歌词
                for (let item1 of time) {
                    let t = item1.slice(1, -1).split(":"); // 取出时间，换算成数组（slice(1, -1)得到除中括号除外的时间）
                    if (value != '') {
                        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]); //转乘十进制*60得到秒+第二个秒，歌词也放入数组——>得到带两个元素的数组[秒，歌词]  
                    }
                }
            }
            //按照第一个元素（时间）排序
            result.sort(function(a, b) {
                return a[0] - b[0]; //谁小谁排前面
            });
            return result;
        },

        //获取生日
        attachBirth(val) {
            return val.substr(0, 10);
        },
    }
}