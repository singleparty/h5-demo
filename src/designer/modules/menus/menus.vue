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
<script type="es6">
    import {getComArr} from 'designer/store/getters';
    var ctor = Vue.extend({
        data () {
            return {}
        },
        methods: {
            add ($index) {
                this.$dispatch('add-on-com', this.menus[$index]['comName']);
            }
        },
        vuex: {
            getters: {
                menus: getComArr
            }
        }
    });
    export default ctor;
</script>