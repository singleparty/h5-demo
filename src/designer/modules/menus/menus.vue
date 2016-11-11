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
    import {comArr} from 'coms/coms-map';
    var ctor = Vue.extend({
        data () {
            return {
                menus: comArr
            }
        },
        methods: {
            add(name) {
                this.$store.commit('ADD_ON_COM', name);
            }
        }
    });
    export default ctor;
</script>