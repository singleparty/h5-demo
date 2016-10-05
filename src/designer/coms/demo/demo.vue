<template>
    <div class="demo">
        <span class="demo-href">
            <img :src="imgSrc" alt="" class="demo-img"/>
        </span>
        <h5 v-for="_desc in data.desc">{{_desc.text}}</h5>
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
            imgSrc() {
                return this.data.imgSrc ? this.data.imgSrc : pic;
            },
            data () {
                var baseInfo = {imgSrc: '', href: '', desc: [{text:'描述1'}, {text: '描述2'}]};
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
        methods: Object.assign({},mapActions(['initComInfo']))
    });
    export default ctor;
</script>