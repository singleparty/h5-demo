<template>
    <div class="two-image">
        <div class="two-image-left">
            <span class="two-image-link">
                <img class="two-image-img" :src="data.left.imgSrc | defaultImg" alt=""/>
            </span>
        </div>
        <div class="two-image-right">
            <span class="two-image-link">
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
                var baseInfo = {left: {imgSrc: '', link: ''}, right: {imgSrc: '', link: ''}};
                if(this.info === null) {
                    //初始化info数据
                    this.$store.commit('INIT_COM_INFO', {
                        info: baseInfo
                    });
                    return baseInfo;
                }
                return this.info;
            }
        },
        data () {
            return {};
        },
        filters: {
            defaultImg: function (val) {
                return val ? val : pic;
            }
        }
    });
    export default ctor;
</script>