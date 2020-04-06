<template>
    <div class="balance-box">
        <div class="balance-box-title">{{title}}</div>
        <div class="balance-box-value"
             v-bind:class="{'balance-box-red': hasAlert, 'balance-box-green': !hasAlert}">
            {{valueTitle}} {{value}}
        </div>
        <div class="balance-box-total">
            {{totalValueTitle}} {{total}}
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'

    @Component
    export default class BalanceBox extends Vue {

        @Prop({required: true, default: false}) hasAlert: boolean;

        @Prop({required: true}) title: string;

        @Prop({required: true}) valueTitle: string;

        @Prop({required: true}) totalValueTitle: string;

        @Prop({required: false, default: 0}) value: number;

        @Prop({required: false, default: 0}) total: number;

    }
</script>

<style lang="less" scoped>
    @import "../less/variables.less";
    @import "../less/mixins.less";

    .balance-box {
        display: flex;
        flex-direction: column;
        margin: 0 10px;
        flex-grow: 1;
    }

    .balance-box-title {
        font-size: @label-font-size-small;
        color: @colorGray;
    }

    .balance-box-value {
        border: 1px solid gray(0);
        border-radius: 2px;
        padding: 5px 10px;
        font-size: 25px;
        text-align: right;
        white-space: nowrap;
    }

    .balance-box-value.balance-box-red {
        text-shadow: 0 0 4px rgba(255, 0, 0, 0.5);
        background: rgba(255, 0, 0, 0.15);
        color: rgba(255, 0, 0, 0.8);
    }

    .balance-box-value.balance-box-green {
        text-shadow: 0 0 4px rgba(0, 255, 0, 0.5);
        background: rgba(0, 255, 0, 0.15);
        color: rgba(0, 255, 0, 0.8);
    }

    .balance-box-total {
        font-size: @label-font-size-xs;
        color: @colorGray;
        text-align: right;
        margin-top: 3px;
    }
</style>