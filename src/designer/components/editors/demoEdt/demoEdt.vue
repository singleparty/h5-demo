<template>
    <div class="demo-edt">
        <div class="item edit-pic">
            <span class="name">修改图片：</span>

            <div class="img-preview">
                <edit-img-src :img-src="info.imgSrc" @update="updateImgSrc"></edit-img-src>
            </div>
        </div>
        <div class="item edit-link">
            <span class="name">跳转页面：</span>

            <div class="link">
                <edit-link :type="info.link.type" :value="info.link.value" @update="updateLink"></edit-link>
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
                    expression: 'link',
                    value: data
                });
            },
            updateImgSrc(data, label) {
                this.editComInfo({
                    index: this.index,
                    expression: 'imgSrc',
                    value: data
                });
            }
        }
    });
    export default ctor;
</script>