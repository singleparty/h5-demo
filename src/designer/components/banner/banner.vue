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
    import {initComInfo} from 'designer/store/actions';
    var ctor = Vue.extend({
        props: ['index', 'info'],
        computed: {
            imgSrc() {
                return this.data.imgSrc ? this.data.imgSrc : pic;
            },
            data () {
                var baseInfo = {imgSrc: '', href: ''};
                if(this.info === null) {
                    //初始化info数据
                    this.initComInfo(this.index, baseInfo);
                    return baseInfo;
                }
                return this.info;
            }
        },
        data () {
            return {};
        },
        vuex: {
            actions: {
                initComInfo
            }
        }
    });
    export default ctor;
</script>