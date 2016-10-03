<template>
    <div class="screen-wrap">
        <div class="screen">
            <div class="screen-header">
                <slot name="operation"></slot>
            </div>
            <div class="canvas-wrap">
                <div class="canvas-adaption">
                    <!--主界面-->
                    <div class="canvas">
                        <div class="basic-com animated"
                             transition="fadeDown"
                             :class="{'active': $index == focus}"
                             :data-com-name="_com.comName"
                             @click="focusCom($index)"
                             v-for="_com in coms"
                             track-by="$index">
                            <component :is="_com.comName" :index="$index" :info="_com.info"></component>
                            <div class="cover animated" transition="fade"
                                 v-if="$index == focus"
                                 @click.stop.prevent="blurCom($index)">
                                <div class="mask"></div>
                                <button class="operate" @click.stop.prevent="deleteCom($index)">删除</button>
                                <button class="operate" @click.stop.prevent="moveUpCom($index)">上移</button>
                                <button class="operate" @click.stop.prevent="moveDownCom($index)">下移</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import 'libs/animate.min.css';
    import {getComs} from 'store/getters';
    import {cancelComEdit, deleteCom, moveUpCom, moveDownCom, showComEdit} from 'store/actions';
    import {comObj, comToEdts} from 'coms/coms-map';
    var ctor = Vue.extend({
        props: {},
        data () {
            return {
                focus: null
            }
        },
        methods: {
            focusCom ($index) {
                this.focus = $index;
                this.showComEdit({
                    index: $index,
                    edtNames: comToEdts[this.coms[$index]['comName']]
                });
            },
            blurCom ($index) {
                this.focus = null;
                this.cancelComEdit();
            },
            deleteCom ($index) {
                this.focus = null;
                this._deleteCom($index);
            },
            moveUpCom ($index) {
                if ($index == 0) return false;
                this._moveUpCom($index);
                this.focus--;
            },
            moveDownCom ($index) {
                if ($index == this.coms.length - 1) return false;
                this._moveDownCom($index);
                this.focus++;
            }
        },
        transitions: {
            fade: {
                enterClass: 'fadeIn',
                leaveClass: 'fadeOut',
                type: 'animation'
            },
            fadeDown: {
                enterClass: 'fadeInDown',
                type: 'animation'
            }
        },
        components: comObj,
        ready () {

        },
        vuex: {
            getters: {
                coms: getComs
            },
            actions: {
                cancelComEdit, showComEdit,
                _deleteCom: deleteCom,
                _moveUpCom: moveUpCom,
                _moveDownCom: moveDownCom,
            }
        }
    });
    export default ctor;
</script>