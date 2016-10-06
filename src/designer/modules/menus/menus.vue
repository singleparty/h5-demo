<template>
    <div class="menus-wrap">
        <!--组件集合-->
        <div class="menus">
            <div class="menu" v-for="menu in menus" track-by="$index" @click="add(menu['comName'])">
                <img :src="menu.logo" alt=""/>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import {mapActions } from 'vuex';
    import {comArr} from 'coms/coms-map';
    var _actions = mapActions({
        add: 'addOnCom'
    });
    var ctor = Vue.extend({
        data () {
            return {
                menus: comArr
            }
        },
        methods: {
            ..._actions
        }
    });
    export default ctor;
</script>