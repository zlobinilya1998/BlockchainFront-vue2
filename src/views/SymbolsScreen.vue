<template>
    <div class="about secondary">
        <h1>Страница офферов</h1>
        <v-btn @click="loadSymbols" style="margin-right: 10px">
            Загрузить
        </v-btn>
        <div style="margin-top: 25px">
            <div v-if="symbols" class="symbols-wrapper">
                <SymbolCard :symbol="symbol" v-for="(symbol,index) in symbols" :key="index"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Currency} from "@/models/Entities/Currency";
import SymbolCard from "@/components/symbols/SymbolCard.vue";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    components: {
        SymbolCard,
    }
})
export default class SymbolsScreen extends Vue {
    loadSymbols = () => this.$store.dispatch('loadSymbols');
    loadSelectList = () => this.$store.dispatch('getSymbolsList');

    get symbols(): Currency[] {
        return this.$store.state.blockchainModule.symbols
    }

    get loading() {
        return this.$store.state.blockchainModule.loading
    }

    mounted() {
        this.loadSymbols();
        this.loadSelectList();
    }
}
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
