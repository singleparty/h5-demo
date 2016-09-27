<template>
    <div class="menus-wrap">
        <!--组件集合-->
        <div class="menus">
            <div class="menu" v-for="menu in menus" track-by="$index" @click="add(menu['comName'])">
                {{menu['comName']}}
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
    import {comArr} from 'components/coms-map';
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