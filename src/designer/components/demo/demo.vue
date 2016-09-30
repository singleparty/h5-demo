<template>
    <div class="demo">
        <span class="demo-href">
            <img :src="imgSrc" alt="" class="demo-img"/>
        </span>
        <h5 v-for="_desc in info.desc">{{_desc.text}}</h5>
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
                        imgSrc: '', href: '', desc: [{text:'描述1'}, {text: '描述2'}]
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