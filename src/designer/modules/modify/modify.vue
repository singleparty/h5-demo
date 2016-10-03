<template>
    <div class="modify-wrap">
        <!--页面级信息编辑器-->
        <div class="modify-scene">
            <div class="item">
                <span class="name">专题名字：</span>
                <label>
                    <input type="text" :value="sceneInfo.name" v-sync-scene-info
                           expression="name" class="input"/>
                </label>
            </div>
        </div>
        <!--组件编辑器-->
        <div class="modify">
            <div class="basic-edt"
                 v-for="edtName in edts.edtNames" track-by="$index"
                 :data-edt-name="edtName">
                <component :is="edtName" :index="edts.index" :info="edts.info"></component>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import {edtObj} from 'editors/edts-map';
    import {getEdts, getSceneInfo} from 'store/getters';
    import {editSceneInfo} from 'store/actions';
    var ctor = Vue.extend({
        data () {
            return {}
        },
        methods: {},
        components: edtObj,
        directives: {
            syncSceneInfo: {
                params: ['expression'],
                bind () {
                    this.el.addEventListener('input', (e)=> {
                        this.vm.editSceneInfo(this.params.expression, e.currentTarget.value);
                    });
                }
            }
        },
        vuex: {
            getters: {
                edts: getEdts,
                sceneInfo: getSceneInfo
            },
            actions: {
                editSceneInfo
            }
        }
    });
    export default ctor;
</script>