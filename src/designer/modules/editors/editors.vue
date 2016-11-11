<template>
    <div class="editors-wrap">
        <!--页面级信息编辑器-->
        <div class="editors-scene">
            <div class="item scene-name">
                <span class="name">专题名字：</span>
                <label>
                    <input type="text" :value="sceneInfo.name" v-sync-scene-info
                           expression="name" class="input"/>
                </label>
            </div>
            <div class="item branch-type">
                <span class="name">type: </span>
                <div class="branchs">
                    <span class="branch" v-for="b in branchType" v-text="b"></span>
                    <span class="add-branch">+</span>
                </div>
            </div>
        </div>
        <!--组件编辑器-->
        <div class="editors">
            <div class="basic-edt" v-for="edtName in edts.edtNames" track-by="$index">
                <component :is="edtName" :index="edts.index" :info="edts.info"></component>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import {edtObj} from 'edts/edts-map';
    import {mapState, mapActions } from 'vuex';
    var _state = mapState({
        edts: state => state.edts,
        sceneInfo: state => state.sceneInfo
    });
    var _actions = mapActions(['editSceneInfo']);
    var ctor = Vue.extend({
        data () {
            return {}
        },
        components: edtObj,
        directives: {
            syncSceneInfo: {
                params: ['expression'],
                bind () {
                    this.el.addEventListener('input', (e)=> {
                        this.vm.editSceneInfo({
                            expression: this.params.expression,
                            value: e.currentTarget.value
                        });
                    });
                }
            }
        },
        computed: {
            ..._state,
            branchType() {
                var type = this.sceneInfo.branch.type;
                return Object.keys(type);
            }
        },
        methods: {
            ..._actions
        }
    });
    export default ctor;
</script>