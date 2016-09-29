<template>
    <div class="brand-edt">
        <h5>修改图片</h5>

        <div class="img-preview" @click="upload">
            <img :src="info.imgSrc" alt="" v-show="showImg"/>
        </div>
        <h5>修改链接</h5>
        <input type="text" :value="info.href" v-sync-com-info :expression="'href'"/>
        <h5>修改文字</h5>
        <input type="text" v-for="(index, _desc) in info.desc" :value="_desc.text" v-sync-com-info
               :expression="'desc.'+index+'.text'"/>
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