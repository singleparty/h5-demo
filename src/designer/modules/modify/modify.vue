<template>
    <div class="modify-wrap">
        <!--页面级信息编辑器-->
        <div class="modify-scene">
            <h5>专题名字</h5>
            <input type="text" v-model="scene.name"/>
        </div>
        <!--组件编辑器-->
        <div class="modify">
            <div class="basic-edt"
                 v-for="edtName in edts.edtNames" track-by="$index"
                 :data-edt-name="edtName">
                <component :is="edtName" :info.sync="edts.info"></component>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    var edtMap = require('editors/edts-map');
    var ctor = Vue.extend({
        props: {
            edts: {
                type: Object,
                default: function () {
                    return {};
                },
                twoWay: true
            },
            scene: {
                type: Object,
                coerce: function (val) {
                    if (val.name === undefined) {
                        Vue.set(val, 'name', '');
                    }
                    return val;
                },
                twoWay: true
            }
        },
        data () {
            return {}
        },
        methods: {},
        components: edtMap.edtObj,
        ready () {

        }
    });
    module.exports = ctor;
</script>