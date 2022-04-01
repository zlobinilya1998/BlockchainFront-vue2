<template>
    <div class="symbol">
        <p>Валюта: <span style="color: darkseagreen;font-weight: bold" v-html="symbol.base_currency"/></p>
        <p>Минимальное кол-во для заказа: {{ symbol.min_order_size.toLocaleString() }}</p>
        <div>Статус: <span :style="{color: getStatus(symbol.status).color}"
                           v-html="getStatus(symbol.status).text"/></div>
        <div style="margin: 20px auto 0;display: flex;justify-content: space-between">
            <c-btn @click="openSymbolInfo(symbol)">
                Подробнее
                <c-icon v-html="'ci-info'"/>
            </c-btn>
            <button v-if="symbol.status === Status.open" style="padding: 10px;cursor: pointer">
                Приобрести
                <i class="ci ci-tag"/>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from "vue";
import {useRouter} from 'vue-router'
import {Currency, getStatus, Status,} from "@/models/Entities/Currency";

interface Props {
    symbol: Currency,
}

const props = defineProps<Props>()

const router = useRouter();

const symbol = computed(() => props.symbol)

const openSymbolInfo = (symbol: Currency) => {
    router.push({
        name: 'symbolInfo',
        params: {
            symbol: `${symbol.base_currency}-${symbol.counter_currency}`
        }
    })
}
</script>


<style>

.symbol {
    border-radius: 10px;
    padding: 20px;
    background: #42414d;
}
</style>
