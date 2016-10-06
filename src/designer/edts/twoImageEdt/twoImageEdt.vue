<template>
    <div class="two-image-edt">
        <div class="left">
            <h5>左侧图片信息修改：</h5>

            <div class="item pic">
                <span class="name">修改图片：</span>

                <div class="img-preview" @click="upload('left')">
                    <img :src="info.left.imgSrc" alt="" v-show="info.left.imgSrc"/>
                </div>
            </div>
            <div class="item href">
                <span class="name">跳转网页：</span>
                <input type="text" :value="info.left.href" v-sync-com-info expression="left.href"/>
            </div>
        </div>
        <div class="right">
            <h5>右侧图片信息修改：</h5>

            <div class="item pic">
                <span class="name">修改图片：</span>

                <div class="img-preview" @click="upload('right')">
                    <img :src="info.right.imgSrc" alt="" v-show="info.right.imgSrc"/>
                </div>
            </div>
            <div class="item href">
                <span class="name">跳转网页：</span>
                <input type="text" :value="info.right.href" v-sync-com-info expression="right.href"/>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import {mapGetters, mapActions } from 'vuex';
    var _getters = mapGetters({
        uploadImgMethods: 'getUploadImgMethods'
    });
    var _actions = mapActions(['editComInfo']);
    var ctor = Vue.extend({
        props: ['index', 'info'],
        computed: {
            ..._getters
        },
        data () {
            return {};
        },
        methods: {
            ..._actions,
            upload (type) {
                this.uploadImgMethods.open((url) => {
                    this.editComInfo({
                        index: this.index,
                        expression: type + '.imgSrc',
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