<template>
    <div class="toast animated" v-show="show" transition="fade">
        <div class="toast-main">
            <div class="toast-content">
                {{content}}
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import 'libs/animate.min.css';
    const ctor = Vue.extend({
        data () {
            return {
                show: false,
                content: '',
                timeoutHandler: null
            }
        },
        methods: {
            open (msg) {
                this.content = msg;
                this.show = true;
                clearTimeout(this.timeoutHandler);
                this.timeoutHandler = setTimeout(()=> {
                    this.close();
                }, 3000);
            },
            close () {
                this.show = false;
            }
        },
        transitions: {
            fade: {
                enterClass: 'fadeInDown',
                leaveClass: 'fadeOutUp',
                type: 'animation'
            }
        }
    });
    export default ctor;
</script>