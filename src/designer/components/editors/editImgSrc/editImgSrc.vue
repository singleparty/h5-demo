<template>
    <div class="edit-img-src" @click="upload">
        <img :src="imgSrc" alt="" v-show="imgSrc"/>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    const ctor = Vue.extend({
        props: {
            imgSrc: [String, Number],
            label: [null]
        },
        data() {
            return {};
        },
        methods: {
            upload() {
                Vue.uploadImg.open((url) => {
                    this.$emit('update', url, this.label);
                });
            }
        }
    });
    export default ctor;
</script>