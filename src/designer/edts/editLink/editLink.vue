<template>
    <div class="edit-link">
        <div class="edit-link-center">
            <div class="edit-link-main">
                <label>
                    <input type="text" class="link-edit" :value="value" v-el:link
                           :class="{success: isSuccess, error: isError}"/>
                </label>
            </div>
        </div>
        <div class="edit-link-left">
            <span class="edit-link-trigger" :class="{active: show}" @click="trigger"></span>

            <div class="edit-link-mask" v-show="show" @click="trigger"></div>
            <ul class="edit-link-dropdown" v-show="show" transition="fade">
                <li class="link-item" :class="{active: type === 'url'}" @click="changeType('url')">跳转到url</li>
                <li class="link-item" :class="{active: type === 'provider'}" @click="changeType('provider')">跳转到店铺</li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    const regs = {
        urlReg: /^\S*$/i,
        providerReg: /^\d*$/i
    };
    const ctor = Vue.extend({
        props: {
            type: [String, Number],
            value: [String, Number],
            label: [null]
        },
        data() {
            return {
                show: false,
                timeoutHandler: null,
                isSuccess: false,
                isError: false
            };
        },
        methods: {
            trigger() {
                this.show = !this.show;
            },
            changeType(type) {
                this.type = type;
                this.show = false;
                this.update();
            },
            update() {
                clearTimeout(this.timeoutHandler);
                this.timeoutHandler = setTimeout(()=> {
                    this.$emit('update', {
                        type: this.type, value: this.value
                    }, this.label);
                }, 100);
            }
        },
        compiled() {
            var link = this.$els.link;
            link.addEventListener('input', e => {
                var val = e.target.value
                this.value = val;
                if(regs[this.type + 'Reg'].test(val)) {
                    this.isSuccess = !(this.isError = false);
                    this.update();
                } else {
                    this.isSuccess = !(this.isError = true);
                }
            }, false);
        },
        transitions: {
            fade: {
                enterClass: 'fadeIn',
                leaveClass: 'fadeOut',
                type: 'animation'
            }
        }
    });
    export default ctor;
</script>