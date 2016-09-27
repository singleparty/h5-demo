<template>
    <div class="brand-edt">
        <h5>修改图片</h5>

        <div class="img-preview" @click="upload">
            <img :src="info.imgSrc" alt="" v-show="showImg"/>
        </div>
        <h5>修改链接</h5>
        <input type="text" v-model="info.href | protocol"/>
        <h5>修改文字</h5>
        <input type="text" v-model="info.text"/>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import {getComs} from 'designer/store/getters';
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
        filters: {
            protocol: {
                read (val) {
                    var pre = '', _temp;
                    _temp = val.replace(/https?:\/\//, function (match) {
                        pre = match;
                        return '';
                    });
                    return pre ? pre + _temp : 'http://' + _temp;
                },
                write (val) {
                    var pre = '', _temp;
                    _temp = val.replace(/https?:\/\//, function (match) {
                        pre = match;
                        return '';
                    });
                    return _temp ? (pre ? pre + _temp : 'http://' + _temp) : '';
                }
            }
        },
        methods: {
            upload () {
                var self = this;
                this.$dispatch('upload-img', function (url) {
                    self.info.imgSrc = url;
                });
            }
        },
        vuex: {
            getters: {
                coms: getComs
            }
        }
    });
    export default ctor;
</script>