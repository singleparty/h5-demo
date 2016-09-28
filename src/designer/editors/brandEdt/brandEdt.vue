<template>
    <div class="brand-edt">
        <h5>修改图片</h5>

        <div class="img-preview" @click="upload">
            <img :src="info.imgSrc" alt="" v-show="showImg"/>
        </div>
        <h5>修改链接</h5>
        <input type="text" :value="info.href"/>
        <h5>修改文字</h5>
        <input type="text" :value="info.text" v-sync-com-info="text"/>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import {getComs} from 'designer/store/getters';
    import {editComInfo} from 'designer/store/actions';
    var ctor = Vue.extend({
        props: ['index'],
        computed: {
            showImg () {
                return !!this.info.imgSrc
            },
            info () {
                return this.coms[this.index]['info'];
            }
        },
        data () {
            return {};
        },
        methods: {
            upload () {
                var self = this;
                this.$dispatch('upload-img', function (url) {
                    self.info.imgSrc = url;
                });
            }
        },
        directives: {
            syncComInfo: {
                bind () {
                    this.el.addEventListener('input', (e)=> {
                        var expression = this.expression;
                        var value = e.currentTarget.value;
                        var info = this.vm.info;
                        this.vm.editComInfo(info, expression, value);
                    });
                }
            }
        },
        vuex: {
            getters: {
                coms: getComs
            },
            actions: {
                editComInfo
            }
        }
    });
    export default ctor;
</script>