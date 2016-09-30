<template>
    <div class="banner-edt">
        <div class="item pic">
            <span class="name">修改图片：</span>

            <div class="img-preview" @click="upload">
                <img :src="info.imgSrc" alt="" v-show="showImg"/>
            </div>
        </div>
        <div class="item href">
            <span class="name">跳转网页：</span>
            <input type="text" :value="info.href" v-sync-com-info :expression="'href'"/>
        </div>
        <div class="item text">
            <span class="name">描述文字：</span>
            <div class="text-content">
                <input type="text" v-for="(index, _desc) in info.desc"
                       :value="_desc.text" v-sync-com-info :expression="'desc.'+index+'.text'"/>
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
                this.uploadImgMethods.open((url) => {
                    this.editComInfo(this.index, 'imgSrc', url);
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