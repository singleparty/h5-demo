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
    import {mapGetters, mapActions } from 'vuex';
    var ctor = Vue.extend({
        props: ['index', 'info'],
        computed: Object.assign({},mapGetters({
            uploadImgMethods: 'getUploadImgMethods'
        })),
        data () {
            return {};
        },
        methods: Object.assign({
            upload () {
                this.uploadImgMethods.open((url) => {
                    this.editComInfo(this.index, 'imgSrc', url);
                });
            }
        }, mapActions(['editComInfo'])),
        directives: {
            syncComInfo: {
                params: ['expression'],
                bind () {
                    this.el.addEventListener('input', (e)=> {
                        this.vm.editComInfo(this.vm.index, this.params.expression, e.currentTarget.value);
                    });
                }
            }
        }
    });
    export default ctor;
</script>