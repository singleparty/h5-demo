<template>
    <div class="symmetry" @click="editor">
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
    import {initComInfo, showComEdit} from 'designer/store/actions';
    var ctor = Vue.extend({
        props: ['index'],
        computed: {
            info () {
                var info = this.coms[this.index]['info'];
                if(info['left'] === undefined) {
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
        methods: {
            editor () {
                this.showComEdit([{
                    index: this.index, edtName: 'symmetryEdt'
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