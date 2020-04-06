<template>
    <div class="notification-wrapper">
        <div class="notification">
            {{message}}
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'

    @Component
    export default class Notification extends Vue {
        @Prop({required: true}) message: string;
    }
</script>

<style lang="less" scoped>
    @import "../less/variables.less";
    @import "../less/mixins.less";

    .notification-wrapper {
        margin: 16px 0;
        & > .notification {
            padding: 12px;
            color: @colorRed;
            display: inline-block;
            border: 1px solid @colorRed;
            font-size: @label-font-size-small;
            font-weight: bold;
            .border-radius(3px);
        }
    }
</style>