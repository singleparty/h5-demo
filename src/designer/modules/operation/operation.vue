<template>
    <div class="operation">
        <button @click="save">保存</button>
        <button @click="publish">发布</button>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    var ctor = Vue.extend({
        data(){
            return {};
        },
        methods: {
            save(){
                this.$dispatch('save');
            },
            publish(){
                this.$dispatch('publish');
            }
        }
    });
    module.exports = ctor;
</script>