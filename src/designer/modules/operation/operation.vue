<template>
    <div class="operation">
        <button class="save" @click="save">保存</button>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import {getComs, getSceneInfo} from 'store/getters';
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
            }
        },
        vuex: {
            getters: {
                coms: getComs,
                sceneInfo: getSceneInfo
            }
        }
    });
    export default ctor;
</script>