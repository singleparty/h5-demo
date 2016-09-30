<template>
    <div class="banner">
        <span class="banner-href">
            <img :src="imgSrc" alt="" class="banner-img"/>
        </span>
    </div>
</template>
<style lang="less" scoped>
    @import './style.less';
</style>
<script type="es6">
    import pic from './default.png';
    import {getComs} from 'designer/store/getters';
    import {initComInfo} from 'designer/store/actions';
    var ctor = Vue.extend({
        props: ['index'],
        computed: {
            imgSrc() {
                return this.info.imgSrc ? this.info.imgSrc : pic;
            },
            info () {
                var info = this.coms[this.index]['info'];
                if(info === null) {
                    //初始化info数据
                    this.initComInfo(this.index, {
                        imgSrc: '', href: ''
                    });
                }
                return this.coms[this.index]['info'];
            }
        },
        data () {
            return {};
        },
        vuex: {
            getters: {
                coms: getComs
            },
            actions: {
                initComInfo
            }
        }
    });
    export default ctor;
</script>