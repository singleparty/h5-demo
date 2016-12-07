<template>
    <div class="edit-link">
        <div class="edit-link-center">
            <div class="edit-link-main">
                <label>
                    <input type="text" class="link-edit" v-model="cValue"
                           :class="{success: isSuccess, error: !isSuccess}"/>
                </label>
            </div>
        </div>
        <div class="edit-link-left">
            <span class="edit-link-trigger" :class="{active: show}" @click="trigger"></span>
            <span class="edit-link-text">{{cType | textFilter}}</span>
            <div class="edit-link-mask" v-show="show" @click="trigger"></div>
            <ul class="edit-link-dropdown" v-show="show" transition="fade">
                <li class="link-item" :class="{active: cType === 0}" @click="changeType(0)">跳转到url</li>
                <li class="link-item" :class="{active: cType === 1}" @click="changeType(1)">跳转到店铺</li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "./style.less";
</style>
<script type="es6">
    import 'libs/animate.min.css';
    const regs = [/^\S*$/i, /^\d*$/i];
    const ctor = Vue.extend({
        props: {
            type: [Number],
            value: [Number],
            label: null
        },
        data() {
            return {
                show: false,
                timeoutHandler: null,
                isSuccess: false,
                cType: this.type,
                cValue: this.value
            };
        },
        methods: {
            trigger() {
                this.show = !this.show;
            },
            changeType(type) {
                this.cType = type;
                this.show = false;
            },
            update() {
                clearTimeout(this.timeoutHandler);
                this.timeoutHandler = setTimeout(()=> {
                    this.$emit('update', {
                        type: this.cType, value: this.cValue
                    }, this.label);
                }, 100);
            },
            verify() {
                return this.isSuccess = regs[this.cType].test(this.cValue);
            }
        },
        transitions: {
            fade: {
                enterClass: 'fadeIn',
                leaveClass: 'fadeOut',
                type: 'animation'
            }
        },
        compiled() {
            this.verify();
        },
        watch: {
            cValue(n, o) {
                if(!this.verify()) return;
                this.update();
            },
            cType(n,o) {
                if(!this.verify()) return;
                this.update();
            }
        },
        filters: {
            textFilter(val) {
                return val === 0 ? '跳转到url' : '跳转到店铺';
            }
        }
    });
    export default ctor;
</script>