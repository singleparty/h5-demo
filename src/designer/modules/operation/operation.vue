<template>
    <div class="operation">
        <button class="save" @click="save">保存</button>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import {getComs, getSceneInfo, getShowMessageMethods} from 'store/getters';
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
                this.showMessageMethods.open('保存成功');
            }
        },
        vuex: {
            getters: {
                coms: getComs,
                sceneInfo: getSceneInfo,
                showMessageMethods: getShowMessageMethods
            }
        }
    });
    export default ctor;
</script>