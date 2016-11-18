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
                             :class="{'active': $index == focus}"
                             :data-com-name="_com.comName"
                             @click="focus($index)"
                             v-for="_com in coms"
                             track-by="$index">
                            <component :is="_com.comName" :index="$index" :info="_com.info"></component>
                            <div class="cover animated" transition="fade"
                                 v-if="$index == activeComIndex"
                                 @click.stop.prevent="blur($index)">
                                <div class="mask"></div>
                                <button class="operate" @click.stop.prevent="remove($index)">删除</button>
                                <button class="operate" @click.stop.prevent="moveUp($index)">上移</button>
                                <button class="operate" @click.stop.prevent="moveDown($index)">下移</button>
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
    import {mapState, mapActions } from 'vuex';
    import {comObj, comToEdts} from './coms-map';
    var _state = mapState({
        coms: state => state.coms,
        activeComIndex: state => state.activeComIndex
    });
    var _actions = mapActions(['showComEdit', 'removeCom']);
    const ctor = Vue.extend({
        props: {},
        data () {
            return {}
        },
        methods: {
            ..._actions,
            focus ($index) {
                this.$store.commit('UPDATE_ACTIVE_COM_INDEX', $index);
            },
            blur () {
                this.$store.commit('UPDATE_ACTIVE_COM_INDEX', null);
            },
            remove ($index) {
                Vue.dialog.open('是否删除专题片段', () => {
                    this.$store.commit('REMOVE_COM', $index);
                });
            },
            moveUp ($index) {
                this.$store.commit('MOVE_UP_COM', $index);
            },
            moveDown ($index) {
                this.$store.commit('MOVE_DOWN_COM', $index);
            }
        },
        transitions: {
            fade: {
                enterClass: 'fadeIn',
                leaveClass: 'fadeOut',
                type: 'animation'
            }
        },
        components: comObj,
        computed: {
            ..._state
        }
    });
    export default ctor;
</script>