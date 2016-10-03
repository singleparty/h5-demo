<template>
    <div class="symmetry">
        <div class="symmetry-left">
            <span class="symmetry-href">
                <img class="symmetry-img" :src="data.left.imgSrc | defaultImg" alt=""/>
            </span>
        </div>
        <div class="symmetry-right">
            <span class="symmetry-href">
                <img class="symmetry-img" :src="data.right.imgSrc | defaultImg" alt=""/>
            </span>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import './style.less';
</style>
<script type="es6">
    import pic from './default.png';
    import {getComs} from 'store/getters';
    import {initComInfo} from 'store/actions';
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
        },
        vuex: {
            actions: {
                initComInfo
            }
        }
    });
    export default ctor;
</script>