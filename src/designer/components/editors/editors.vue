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
                    <span class="branch" :class="{active: activeBranch == $index}"
                          @click="changeBranch('type', branchKey, $index)"
                          v-for="branchKey in getTypeBranchs" v-text="branchKey"></span>
                    <span class="add-branch" @click="addBranch('type')">+</span>
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
                var type = this.sceneInfo.branch.type;
                return Object.keys(type).sort(function (a, b) {
                    return a - b;
                });
            }
        },
        methods: {
            ..._actions,
            addBranch(branchName) {
                this.$store.commit('ADD_BRANCH', {
                    branchName: branchName
                });
            },
            changeBranch(branchName, branchKey, index) {
                this.activeBranch = index;
                this.$store.dispatch('changeBranch', {
                    branchName: branchName,
                    branchKey: branchKey
                });
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