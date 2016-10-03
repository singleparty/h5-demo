<template>
    <div class="menus-wrap">
        <!--组件集合-->
        <div class="menus">
<<<<<<< HEAD
            <div class="menu" v-for="menu in menus" track-by="$index" @click="add($index)">
                {{menu['comName']}}
=======
            <div class="menu" v-for="menu in menus" track-by="$index" @click="add(menu['comName'])">
                <img :src="menu.logo" alt=""/>
>>>>>>> dev
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import {getComArr} from 'store/getters';
    import {addOnCom} from 'store/actions';
    import {comArr} from 'coms/coms-map';
    var ctor = Vue.extend({
        data () {
            return {
                menus: comArr
            }
        },
        methods: {},
        vuex: {
            actions: {
                add: addOnCom
            }
        }
    });
    export default ctor;
</script>