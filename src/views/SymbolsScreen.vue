<template>
    <div class="about">
        <h1>Страница офферов</h1>
        <c-btn @click="loadSymbols" style="margin-right: 10px">
            Загрузить
            <c-icon v-html="'ci-refresh'"/>
        </c-btn>
        <div style="margin-top: 25px">
            <c-loader v-if="loading"/>
            <div v-else-if="symbols" class="symbols-wrapper">
                <SymbolCard :symbol="symbol" v-for="(symbol,index) in symbols" :key="index"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, onMounted} from "vue";
import {useStore} from "vuex";
import {Currency} from "@/models/Entities/Currency";
import SymbolCard from "@/components/symbols/SymbolCard.vue";

const store = useStore();
const loadSymbols = () => store.dispatch('loadSymbols');
const loadSelectList = () => store.dispatch('getSymbolsList');

const symbols = computed<Currency[]>(() => store.state.blockchainModule.symbols);
const loading = computed(() => store.state.blockchainModule.loading);

onMounted(async () => {
    await loadSymbols();
    await loadSelectList();
})
</script>


<style>
.symbols-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
}

.symbol {
    border-radius: 10px;
    padding: 20px;
    background: #42414d;
}
</style>
