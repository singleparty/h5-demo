<template>
    <div class="editors-wrap">
        <!--页面级信息编辑器-->
        <div class="editors-scene">
            <div class="item scene-name">
                <span class="name">文件名：</span>
                <label>
                    <input type="text" :value="sceneInfo.pageName" class="input" v-el:scene-info-name/>
                </label>
            </div>
            <div class="item branch-type">
                <span class="name">type: </span>
                <div class="branchs">
                    <span class="branch" :class="{active: activeBranch == branch.type}"
                          @click="changeBranch(branch.type)"
                          v-for="branch in getTypeBranchs" v-text="branch.type"></span>
                    <span class="add-branch" @click="addBranch()">+</span>
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
    import {edtObj} from './edts-map';
    import {mapState, mapActions, mapGetters} from 'vuex';
    const _state = mapState({
        coms: state => state.coms,
        sceneInfo: state => state.sceneInfo
    });
    const _actions = mapActions(['editSceneInfo']);
    const _getters = mapGetters({
        edts: 'getEdts'
    });
    const ctor = Vue.extend({
        data () {
            return {
                activeBranch: 1
            }
        },
        components: edtObj,
        computed: {
            ..._state, ..._getters,
            getTypeBranchs() {
                var types = this.sceneInfo.types;
                return types.sort(function (a, b) {
                    return a.type - b.type;
                });
            }
        },
        methods: {
            ..._actions,
            addBranch() {
                this.$store.commit('ADD_BRANCH');
            },
            changeBranch(num) {
                this.activeBranch = index;
                this.$store.dispatch('changeBranch', num);
            }
        },
        compiled() {
            var name = this.$els.sceneInfoName;
            name.addEventListener('input', e => {
                var val = e.target.value;
                this.editSceneInfo({
                    expression: 'pageName',
                    value: val
                });
            }, false);
        }
    });
    export default ctor;
</script>