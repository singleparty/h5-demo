<template>
    <div class="brand" @click="editor">
    <span class="brand-href">
        <img :src="imgSrc" alt="" class="brand-img"/>
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
    import {initComInfo, showComEdit} from 'designer/store/actions';
    var ctor = Vue.extend({
        props: ['index'],
        computed: {
            imgSrc() {
                return this.info.imgSrc ? this.info.imgSrc : pic;
            },
            info () {
                var info = this.coms[this.index]['info'];
                if(info['imgSrc'] === undefined) {
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
        methods: {
            editor () {
                this.showComEdit([{
                    index: this.index, edtName: 'brandEdt'
                }]);
            }
        },
        vuex: {
            getters: {
                coms: getComs
            },
            actions: {
                initComInfo, showComEdit
            }
        }
    });
    export default ctor;
</script>