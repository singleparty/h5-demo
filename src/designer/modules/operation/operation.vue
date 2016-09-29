<template>
    <div class="operation">
        <button class="save" @click="save">保存</button>
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
                console.log('save');
            }
        }
    });
    export default ctor;
</script>