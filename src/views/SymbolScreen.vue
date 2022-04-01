<template>
    <div style="margin-top: 25px">
        <c-loader v-if="loading"/>
        <SymbolCard v-else-if="symbol" class="symbol-info" :symbol="symbol" style="max-width: 450px"/>
        <div v-else>Информация по символу не найдена</div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {Currency} from "@/models/Entities/Currency";
import SymbolCard from "@/components/symbols/SymbolCard.vue";

const store = useStore();
const route = useRoute();

const loading = ref(false);
const symbol = ref<Currency | null>(null);
const loadSymbolInfo = async () => {
    loading.value = true;
    symbol.value  = await store.dispatch('getSymbolInfo', route.params.symbol);
    loading.value = false;
}
onMounted(loadSymbolInfo)
</script>

<style scoped>
.symbol-info {
    display: flex;
    flex-direction: column;
}
</style>
