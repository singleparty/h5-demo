<template>
    <div>
        <h3>
            Count is {{ counterValue }}
        </h3>
    </div>
</template>
<style lang="less" scoped>

</style>
<script type="es6">
    import { getCount } from './js/getters.js';
    export default {
        vuex: {
            getters: {
                counterValue: getCount
            }
        }
    }
</script> 