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
<script>
    module.exports = Vue.extend({
        props: {
            info: {
                type: Object,
                twoWay: true
            }
        },
        computed: {
            showImg: function () {
                return !!this.info.imgSrc
            }
        },
        data: function () {
            return {};
        },
        watch: {},
        filters: {
            protocol: {
                read: function (val) {
                    var pre = '', _temp;
                    _temp = val.replace(/https?:\/\//, function (match) {
                        pre = match;
                        return '';
                    });
                    return pre ? pre + _temp : 'http://' + _temp;
                },
                write: function (val) {
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
            upload: function () {
                var self = this;
                this.$dispatch('upload-img', function (url) {
                    self.info.imgSrc = url;
                });
            }
        }
    });
</script>