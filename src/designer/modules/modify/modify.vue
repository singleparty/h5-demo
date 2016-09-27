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
    import {getEdts} from 'designer/store/getters';
    var ctor = Vue.extend({
        props: {
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
        components: edtObj,
        vuex: {
            getters: {
                edts: getEdts
            }
        }
    });
    export default ctor;
</script>