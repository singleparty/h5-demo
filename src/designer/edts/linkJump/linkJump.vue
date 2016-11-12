<template>
    <div class="link-jump">
        <div class="link-jump-center">
            <div class="link-jump-main">
                <label>
                    <input type="text" class="link-edit" :value="value" v-el:link-edit/>
                </label>
            </div>
        </div>
        <div class="link-jump-left">
            <span class="link-jump-trigger" :class="{active: show}" @click="trigger"></span>
            <div class="link-jump-mask" v-show="show" @click="trigger"></div>
            <ul class="link-jump-dropdown" v-show="show" transition="fade">
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
    var ctor = Vue.extend({
        props: {
            type: [String, Number],
            value: [String, Number]
        },
        data() {
            return {
                show: false,
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
                this.$emit('update', {
                    type: this.type, value: this.value
                });
            }
        },
        ready() {
            var edit = this.$els.linkEdit;
            edit.addEventListener('input', e => {
                this.value = e.target.value;
                this.update();
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