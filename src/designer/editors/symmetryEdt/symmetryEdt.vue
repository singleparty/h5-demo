<template>
    <div class="symmetry-edt">
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
    import {getComs, getUploadImgMethods} from 'designer/store/getters';
    import {editComInfo} from 'designer/store/actions';
    var ctor = Vue.extend({
        props: ['index'],
        computed: {
            info () {
                return this.coms[this.index]['info'];
            }
        },
        data () {
            return {};
        },
        methods: {
            upload (type) {
                this.uploadImgMethods.open((url) => {
                    this.editComInfo(this.index, type + '.imgSrc', url);
                });
            }
        },
        directives: {
            syncComInfo: {
                params: ['expression'],
                bind () {
                    this.el.addEventListener('input', (e)=> {
                        this.vm.editComInfo(this.vm.index, this.params.expression, e.currentTarget.value);
                    });
                }
            }
        },
        vuex: {
            getters: {
                coms: getComs,
                uploadImgMethods: getUploadImgMethods
            },
            actions: {
                editComInfo
            }
        }
    });
    export default ctor;
</script>