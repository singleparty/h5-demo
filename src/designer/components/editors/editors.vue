<template>
    <div class="editors-wrap">
        <!--页面级信息编辑器-->
        <div class="editors-scene">
            <div class="item scene-name">
                <span class="name">文件名：</span>
                <label>
                    <input type="text" :value="sceneInfo.pageName"
                           class="input"
                           :class="{success: this.pageNameSuccess, error: this.pageNameError}"
                           placeholder="格式：bainian_20161112"
                           v-el:scene-info-name/>
                </label>
            </div>
            <div class="item scene-title">
                <span class="title">页面title：</span>
                <label>
                    <input type="text" :value="sceneInfo.pageTitle" class="input" v-el:scene-info-title/>
                </label>
            </div>
            <div class="item branch-type">
                <span class="name">type: </span>
                <div class="branchs">
                    <span class="branch" :class="{active: activeBranch == branch.type}"
                          @click="changeBranch(branch.type)"
                          v-for="branch in sceneInfo.types" v-text="branch.type"></span>
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
        activeBranch: state => state.activeBranch,
        sceneInfo: state => state.sceneInfo
    });
    const _actions = mapActions(['editSceneInfo']);
    const _getters = mapGetters({
        edts: 'getEdts'
    });
    const pageNameReg = /^[a-zA-Z]+_\d+$/;
    const ctor = Vue.extend({
        data () {
            return {
                pageNameSuccess: false,
                pageNameError: false
            }
        },
        components: edtObj,
        computed: {
            ..._state, ..._getters
        },
        methods: {
            ..._actions,
            addBranch() {
                this.$store.commit('ADD_BRANCH');
            },
            changeBranch(num) {
                this.activeBranch = num;
                this.$store.dispatch('changeBranch', num);
            },
            verify(reg, val) {
                return reg.test(val);
            }
        },
        compiled() {
            var name = this.$els.sceneInfoName;
            var title = this.$els.sceneInfoTitle;
            name.addEventListener('input', e => {
                var val = e.target.value;
                if (this.verify(pageNameReg, val)) {
                    this.pageNameSuccess = !(this.pageNameError = false);
                    this.editSceneInfo({
                        expression: 'pageName',
                        value: val
                    });
                } else {
                    this.pageNameSuccess = !(this.pageNameError = true);
                }
            }, false);
            title.addEventListener('input', e => {
                var val = e.target.value;
                this.editSceneInfo({
                    expression: 'pageTitle',
                    value: val
                });
            }, false);
        }
    });
    export default ctor;
</script>