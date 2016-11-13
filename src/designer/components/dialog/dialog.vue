<template>
    <div class="dialog animated" v-show="show" transition="fade">
        <div class="dialog-main">
            <div class="dialog-content" v-el:content></div>
            <div class="dialog-buttons">
                <div class="dialog-cancel" @click="doSomeThing('cancel')">取消</div>
                <div class="dialog-confirm" @click="doSomeThing('confirm')">确认</div>
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
                callback: {}
            }
        },
        methods: {
            open (node, success, fail) {
                if (typeof(node) === 'string' || node instanceof Element) {
                    if(typeof(node) === 'string') {
                        var _str = node;
                        node = document.createElement('div');
                        node.innerText = _str;
                    }
                } else {
                    console.warn('缺少node参数');
                    return false;
                }
                var content = this.$els.content;
                content.innerHTML = '';
                content.append(node);
                this.show = true;
                this.callback = {success, fail};
            },
            close () {
                this.show = false;
            },
            doSomeThing(type) {
                switch (type) {
                    case 'confirm':
                            if(this.callback.success) this.callback.success();
                        break;
                    case 'cancel':
                        if(this.callback.fail) this.callback.fail();
                        break;
                }
                this.close();
            }
        },
        compiled () {
            this.$store.commit('SET_DIALOG_METHODS', {
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