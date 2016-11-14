<template>
    <div class="banner-edt">
        <div class="item edit-pic">
            <span class="name">修改图片：</span>

            <div class="img-preview" @click="upload">
                <img :src="info.imgSrc" alt="" v-show="info.imgSrc"/>
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
    import {mapActions} from 'vuex';
    import editLink from '../editLink/editLink.vue';
    var _actions = mapActions(['editComInfo']);
    const ctor = Vue.extend({
        props: ['index', 'info'],
        data () {
            return {};
        },
        components: {
            editLink
        },
        methods: {
            ..._actions,
            upload () {
                Vue.uploadImg.open((url) => {
                    this.editComInfo({
                        index: this.index,
                        expression: 'imgSrc',
                        value: url
                    });
                });
            },
            updateLink(data, label) {
                this.editComInfo({
                    index: this.index,
                    expression: 'link',
                    value: data
                });
            }
        }
    });
    export default ctor;
</script>