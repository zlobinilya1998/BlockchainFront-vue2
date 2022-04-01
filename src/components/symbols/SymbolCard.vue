<template>
    <div class="symbol" style="background-color: #F0F0F0">
        <p>Валюта: <span style="color: darkseagreen;font-weight: bold" v-html="symbol.base_currency"/></p>
        <p>Минимальное кол-во для заказа: {{ symbol.min_order_size.toLocaleString() }}</p>
        <div>Статус: <span :style="{color: getStatus(symbol.status).color}"
                           v-html="getStatus(symbol.status).text"/></div>
        <div style="margin: 20px auto 0;display: flex;justify-content: space-between">
            <v-btn @click="openSymbolInfo(symbol)">
                Подробнее
                <v-icon v-html="'ci-info'"/>
            </v-btn>
            <v-btn v-if="symbol.status === symbolStatus.open" style="padding: 10px;cursor: pointer">
                Приобрести
                <i class="ci ci-tag"/>
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts">
import {Currency, getStatus, Status} from "@/models/Entities/Currency";
import {Prop} from "vue-property-decorator";
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class SymbolCard extends Vue {
    @Prop() symbol: Currency;
    symbolStatus  = Status;

    openSymbolInfo = (symbol: Currency) => {
        this.$router.push({
            name: 'symbolInfo',
            params: {
                symbol: `${symbol.base_currency}-${symbol.counter_currency}`
            }
        })
    }
    getStatus = (status: Status) => getStatus(status);
}



</script>


<style>

.symbol {
    border-radius: 10px;
    padding: 20px;
    background: #42414d;
}
</style>
