<template>
    <div class="modify-wrap">
        <!--页面级信息编辑器-->
        <div class="modify-scene">
            <h5>专题名字</h5>
            <input type="text" v-model="sceneInfo.name"/>
        </div>
        <!--组件编辑器-->
        <div class="modify">
            <div class="basic-edt"
                 v-for="_edt in edts" track-by="$index"
                 :data-edt-name="_edt.edtName">
                <component :is="_edt.edtName" :index="_edt.index"></component>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import {edtObj} from 'editors/edts-map';
    import {getEdts, getSceneInfo} from 'designer/store/getters';
    var ctor = Vue.extend({
        data () {
            return {}
        },
        methods: {},
        components: edtObj,
        vuex: {
            getters: {
                edts: getEdts,
                sceneInfo: getSceneInfo
            }
        }
    });
    export default ctor;
</script>