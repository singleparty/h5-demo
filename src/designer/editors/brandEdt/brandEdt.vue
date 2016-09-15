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
    var ctor = Vue.extend({
        props: {
            info: {
                type: Object,
                twoWay: true
            }
        },
        computed: {
            showImg () {
                return !!this.info.imgSrc
            }
        },
        data () {
            return {};
        },
        watch: {},
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
        }
    });
    module.exports = ctor;
</script>