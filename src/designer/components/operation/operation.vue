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
        sceneInfo: state => state.sceneInfo
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
                Vue.toast.open('保存成功');
            }
        },
        computed: {
            ..._state
        }
    });
    export default ctor;
</script>