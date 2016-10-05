<template>
    <div class="two-image">
        <div class="two-image-left">
            <span class="two-image-href">
                <img class="two-image-img" :src="data.left.imgSrc | defaultImg" alt=""/>
            </span>
        </div>
        <div class="two-image-right">
            <span class="two-image-href">
                <img class="two-image-img" :src="data.right.imgSrc | defaultImg" alt=""/>
            </span>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import './style.less';
</style>
<script type="es6">
    import pic from './default.png';
    import {mapActions } from 'vuex';
    var ctor = Vue.extend({
        props: ['index', 'info'],
        computed: {
            data () {
                var baseInfo = {left: {imgSrc: '', href: ''}, right: {imgSrc: '', href: ''}};
                if(this.info === null) {
                    //初始化info数据
                    this.initComInfo(this.index, baseInfo);
                    return baseInfo;
                }
                return baseInfo;
            }
        },
        data () {
            return {};
        },
        filters: {
            defaultImg: function (val) {
                return val ? val : pic;
            }
        },
        methods: Object.assign({},mapActions(['initComInfo']))
    });
    export default ctor;
</script>