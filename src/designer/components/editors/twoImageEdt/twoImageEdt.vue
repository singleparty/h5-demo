<template>
    <div class="two-image-edt">
        <div class="left">
            <h5>左侧图片信息修改：</h5>

            <div class="item edit-pic">
                <span class="name">修改图片：</span>

                <div class="img-preview">
                    <edit-img-src :img-src="info.left.imgSrc" label="left" @update="updateImgSrc"></edit-img-src>
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

                <div class="img-preview">
                    <edit-img-src :img-src="info.right.imgSrc" label="right" @update="updateImgSrc"></edit-img-src>
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
    import {mapActions } from 'vuex';
    import editLink from '../editLink/editLink.vue';
    import editImgSrc from '../editImgSrc/editImgSrc.vue';
    var _actions = mapActions(['editComInfo']);
    const ctor = Vue.extend({
        props: ['index', 'info'],
        data () {
            return {};
        },
        components: {
            editLink, editImgSrc
        },
        methods: {
            ..._actions,
            updateLink(data, label) {
                this.editComInfo({
                    index: this.index,
                    expression: label + '.link',
                    value: data
                });
            },
            updateImgSrc(data, label) {
                this.editComInfo({
                    index: this.index,
                    expression: label + '.imgSrc',
                    value: data
                });
            }
        }
    });
    export default ctor;
</script>