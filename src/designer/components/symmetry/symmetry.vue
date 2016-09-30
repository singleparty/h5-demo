<template>
    <div class="symmetry">
        <div class="symmetry-left">
            <span class="symmetry-href">
                <img class="symmetry-img" :src="info.left.imgSrc | defaultImg" alt=""/>
            </span>
        </div>
        <div class="symmetry-right">
            <span class="symmetry-href">
                <img class="symmetry-img" :src="info.right.imgSrc | defaultImg" alt=""/>
            </span>
        </div>
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
            info () {
                var info = this.coms[this.index]['info'];
                if(info === null) {
                    //初始化info数据
                    this.initComInfo(this.index, {
                        left: {imgSrc: '', href: ''},
                        right: {imgSrc: '', href: ''}
                    });
                }
                return this.coms[this.index]['info'];
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