<template>
    <div class="two-image-edt">
        <div class="left">
            <h5>左侧图片信息修改：</h5>

            <div class="item edit-pic">
                <span class="name">修改图片：</span>

                <div class="img-preview" @click="upload('left')">
                    <img :src="info.left.imgSrc" alt="" v-show="info.left.imgSrc"/>
                </div>
            </div>
            <div class="item edit-link">
                <span class="name">跳转页面：</span>
                <div class="link">
                    <edit-link :type="info.left.link.type"
                               :value="info.left.link.value" label="left" @update="updateLink">
                    </edit-link>
                </div>
            </div>
        </div>
        <div class="right">
            <h5>右侧图片信息修改：</h5>

            <div class="item edit-pic">
                <span class="name">修改图片：</span>

                <div class="img-preview" @click="upload('right')">
                    <img :src="info.right.imgSrc" alt="" v-show="info.right.imgSrc"/>
                </div>
            </div>
            <div class="item edit-link">
                <span class="name">跳转页面：</span>
                <div class="link">
                    <edit-link :type="info.right.link.type"
                               :value="info.right.link.value" label="right" @update="updateLink">
                    </edit-link>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import {mapState, mapActions } from 'vuex';
    import editLink from '../editLink/editLink.vue';
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
        components: {
            editLink
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
            },
            updateLink(data, label) {
                this.editComInfo({
                    index: this.index,
                    expression: label + '.link',
                    value: data
                });
            }
        }
    });
    export default ctor;
</script>