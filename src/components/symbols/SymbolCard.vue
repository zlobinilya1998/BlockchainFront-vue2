<template>
    <div class="symbol white">
        <p>Валюта: <span style="color: darkseagreen;font-weight: bold" v-html="symbol.base_currency"/></p>
        <p v-if="symbol.min_order_size">Минимальное кол-во для заказа: {{ symbol.min_order_size.toLocaleString() }}</p>
        <div>Статус: <span :style="{color: getStatus(symbol.status).color}"
                           v-html="getStatus(symbol.status).text"/></div>
        <v-expand-transition>
            <div v-if="expanded">
                <div>Изменение за последние 24 часа: <span :style="{color: dynamicColor}" v-html="`${Math.floor(symbol.imbalance)}%`"/></div>
            </div>
        </v-expand-transition>
        <div style="margin: 20px auto 0;display: flex;justify-content: space-between">
            <v-btn @click="openSymbolInfo" color="secondary">
                {{ expanded ? 'Свернуть':'Подробнее'}}
                <v-icon v-html="'ci-info'"/>
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
    symbolStatus = Status;
    expanded = false;

    openSymbolInfo(){
        this.expanded = !this.expanded;
    }
    getStatus = (status: Status) => getStatus(status);

    get dynamicColor(){
        const imbalance = this.symbol.imbalance
        if (imbalance > 0) return 'green';
        else if (imbalance == 0) return '';
        else return 'red';
    }
}



</script>


<style>

.symbol {
    border-radius: 10px;
    padding: 20px;
    background: #42414d;
}
</style>
