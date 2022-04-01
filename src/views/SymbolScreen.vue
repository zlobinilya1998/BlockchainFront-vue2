<template>
    <div style="margin-top: 25px">
        <div>Symbol Screen</div>
<!--        <c-loader v-if="loading"/>-->
<!--        <SymbolCard v-else-if="symbol" class="symbol-info" :symbol="symbol" style="max-width: 450px"/>-->
<!--        <div v-else>Информация по символу не найдена</div>-->
    </div>
</template>

<script lang="ts">
import {Currency} from "@/models/Entities/Currency";
import SymbolCard from "@/components/symbols/SymbolCard.vue";
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class SymbolScreen extends Vue {
    loading = false;
    symbol: Currency | null = null;
    loadSymbolInfo = async () => {
        this.loading = true;
        this.symbol = await this.$store.dispatch('getSymbolInfo', this.$route.params.symbol);
        this.loading = false;
    }
    mounted(){
        this.loadSymbolInfo();
    }
}
</script>

<style scoped>
.symbol-info {
    display: flex;
    flex-direction: column;
}
</style>
