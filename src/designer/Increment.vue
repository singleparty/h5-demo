<template>
    <div>
        <button @click="increment">Increment +1</button>
    </div>
</template>
<style lang="less" scoped>

</style>
<script type="es6">
    import { increment } from './js/actions.js';
    export default {
        vuex: {
            actions: {
                increment: increment
            }
        }
    };
</script> 