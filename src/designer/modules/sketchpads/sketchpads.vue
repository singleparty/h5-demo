<template>
    <div class="sketchpads-wrap">
        <div class="sketchpads">
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
                            <component :is="_com.comName" :info="_com.info" :index="$index"></component>
                            <div class="cover animated" transition="fade"
                                 v-if="$index == focus"
                                 @click.stop.prevent="blurCom($index)">
                                <div class="mask"></div>
                                <button @click.stop.prevent="deleteCom($index)">删除</button>
                                <button @click.stop.prevent="moveUpCom($index)">上移</button>
                                <button @click.stop.prevent="moveDownCom($index)">下移</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script>
    var animate = require('libs/animate.min.css');
    var comMap = require('components/coms-map');
    module.exports = Vue.extend({
        props: {
            coms: {
                type: Array,
                default: function () {
                    return [];
                },
                twoWay: false
            }
        },
        data: function () {
            return {
                focus: null
            }
        },
        methods: {
            focusCom: function ($index) {
                this.focus = $index;
            },
            blurCom: function ($index) {
                this.focus = null;
                this.$dispatch('cancel-edit-com', {index: $index});
            },
            deleteCom: function ($index) {
                this.blurCom($index);
                this.coms.splice($index, 1);
            },
            moveUpCom: function ($index) {
                if ($index == 0) return false;
                var _temp = this.coms[$index];
                this.coms.$set($index, this.coms[$index - 1]);
                this.coms.$set($index - 1, _temp);
                this.focus--;
            },
            moveDownCom: function ($index) {
                if ($index == this.coms.length - 1) return false;
                var _temp = this.coms[$index];
                this.coms.$set($index, this.coms[$index + 1]);
                this.coms.$set($index + 1, _temp);
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
                leaveClass: 'fadeOut',
                type: 'animation'
            }
        },
        components: comMap.comObj,
        ready: function () {

        }
    });
</script>