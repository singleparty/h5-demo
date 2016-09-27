<template>
    <div class="brand" @click="editor($event)">
    <span class="brand-href">
        <img :src="imgSrc" alt="" class="brand-img"/>
    </span>
        <h5>{{info.text}}</h5>
    </div>
</template>
<style lang="less" scoped>
    @import './style.less';
</style>
<script type="es6">
    import pic from './default.png';
    import {getComs} from 'designer/store/getters';
    import {editComInfo} from 'designer/store/actions';
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
                    this.editComInfo(this.index, {
                        imgSrc: '', href: '', text: 'text'
                    });
                }
                return this.coms[this.index]['info'];
            }
        },
        data () {
            return {};
        },
        methods: {
            editor ($event) {
                this.$dispatch('edit-com', {edtNames: ['brandEdt'], index: this.index});
            }
        },
        vuex: {
            getters: {
                coms: getComs
            },
            actions: {
                editComInfo: editComInfo
            }
        }
    });
    export default ctor;
</script>