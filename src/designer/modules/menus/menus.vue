<template>
    <div class="menus-wrap">
        <!--组件集合-->
        <div class="menus">
            <div class="menu" v-for="menu in menus" track-by="$index" @click="add(menu['comName'])">
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
    import {addOnCom} from 'designer/store/actions';
    var ctor = Vue.extend({
        data () {
            return {}
        },
        methods: {},
        vuex: {
            getters: {
                menus: getComArr
            },
            actions: {
                add: addOnCom
            }
        }
    });
    export default ctor;
</script>