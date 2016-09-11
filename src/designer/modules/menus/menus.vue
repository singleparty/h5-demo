<template>
    <div class="menus-wrap">
        <!--组件集合-->
        <div class="menus">
            <div class="menu" v-for="menu in menus" track-by="$index" @click="add($index)">
                {{menu['zh-comName']}}
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script>
    var comMap = require('components/coms-map');
    module.exports = Vue.extend({
        data: function () {
            return {
                menus: comMap.comArr
            }
        },
        methods: {
            add: function ($index) {
                this.$dispatch('add-on-com', this.menus[$index]['comName']);
            }
        }
    });
</script>