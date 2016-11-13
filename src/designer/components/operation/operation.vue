<template>
    <div class="operation">
        <button class="save" @click="save">保存</button>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import {mapState } from 'vuex';
    var _state = mapState({
        coms: state => state.coms,
        sceneInfo: state => state.sceneInfo,
        toastMethods: state => state.toastMethods
    });
    const ctor = Vue.extend({
        data(){
            return {};
        },
        methods: {
            save(){
                var data = {
                    sceneInfo: this.sceneInfo
                };
                localStorage.setItem('scene', encodeURIComponent(JSON.stringify(data)));
                this.toastMethods.open('保存成功');
            }
        },
        computed: {
            ..._state
        }
    });
    export default ctor;
</script>