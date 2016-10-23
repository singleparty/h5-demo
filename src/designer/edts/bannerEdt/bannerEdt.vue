<template>
    <div class="banner-edt">
        <div class="item pic">
            <span class="name">修改图片：</span>

            <div class="img-preview" @click="upload">
                <img :src="info.imgSrc" alt="" v-show="info.imgSrc"/>
            </div>
        </div>
        <div class="item href">
            <span class="name">跳转网页：</span>
            <input type="text" :value="info.href" v-sync-com-info :expression="'href'"/>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import {mapState, mapActions } from 'vuex';
    var _state = mapState({
        uploadImgMethods: state => state.uploadImgMethods
    });
    var _actions = mapActions(['editComInfo']);
    var ctor = Vue.extend({
        props: ['index', 'info'],
        computed: {
            ..._state
        },
        data () {
            return {};
        },
        methods: {
            ..._actions,
            upload () {
                this.uploadImgMethods.open((url) => {
                    this.editComInfo({
                        index: this.index,
                        expression: 'imgSrc',
                        value: url
                    });
                });
            }
        },
        directives: {
            syncComInfo: {
                params: ['expression'],
                bind () {
                    this.el.addEventListener('input', (e)=> {
                        this.vm.editComInfo({
                            index: this.vm.index,
                            expression: this.params.expression,
                            value: e.currentTarget.value
                        });
                    });
                }
            }
        }
    });
    export default ctor;
</script>