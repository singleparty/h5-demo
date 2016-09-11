<template>
    <div class="brand" @click="editor($event)">
    <span class="brand-href">
        <img :src="imgSrc" alt="" class="brand-img"/>
    </span>
        <h5>{{info.text}}</h5>
    </div>
</template>
<style lang="less" scoped>
    @import './style.less';
</style>
<script>
    var pic = require('./default.png');
    module.exports = Vue.extend({
        props: {
            //初始化
            info: {
                type: Object,
                coerce: function(val){
                    if(val.imgSrc === undefined) {
                        Vue.set(val, 'imgSrc', '');
                    }
                    if(val.href === undefined) {
                        Vue.set(val, 'href', '');
                    }
                    if(val.text === undefined) {
                        Vue.set(val, 'text', 'text');
                    }
                    return val;
                },
                twoWay: false
            },
            index: {

            }
        },
        computed:{
            imgSrc: function() {
                return this.info.imgSrc ? this.info.imgSrc : pic;
            }
        },
        data: function () {
            return {};
        },
        methods: {
            editor: function ($event) {
                this.$dispatch('edit-com', {edtNames: ['brandEdt'], index: this.index});
            }
        }
    });
</script>