<template>
    <div>
        <Display></Display>
        <Increment></Increment>
    </div>
</template>
<style lang="less" scoped>

</style>
<script type="es6">
    import Display from './Display.vue';
    import Increment from './Increment.vue';
    import store from './js/store.js';
    export default {
        components: {
            Display, Increment
        },
        store
    }
</script> 