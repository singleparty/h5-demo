<template>
    <div class="operation">
        <button class="save" @click="save">保存</button>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import {mapGetters } from 'vuex';
    var _getters = mapGetters({
        coms: 'getComs',
        sceneInfo: 'getSceneInfo',
        toastMethods: 'getToastMethods'
    });
    var ctor = Vue.extend({
        data(){
            return {};
        },
        methods: {
            save(){
                var data = {
                    coms: this.coms,
                    sceneInfo: this.sceneInfo
                };
                localStorage.setItem('scene', encodeURIComponent(JSON.stringify(data)));
                this.toastMethods.open('保存成功');
            }
        },
        computed: {
            ..._getters
        }
    });
    export default ctor;
</script>