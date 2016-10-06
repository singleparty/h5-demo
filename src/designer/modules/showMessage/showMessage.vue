<template>
    <div class="show-message animated" v-show="show" transition="fade">
        <div class="show-message-main">
            <div class="show-message-content">
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
    import {mapActions } from 'vuex';
    var _actions = mapActions(['setShowMessageMethods']);
    var ctor = Vue.extend({
        data () {
            return {
                show: false,
                content: '',
                timeoutHandler: null
            }
        },
        methods: {
            ..._actions,
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
        compiled () {
            this.setShowMessageMethods({
                open: this.open,
                close: this.close
            });
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