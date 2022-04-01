<template>
    <div class="about secondary">
        <v-btn :loading="loading" color="primary" class="my-3" @click="loadSymbols">
            Загрузить
            <v-icon v-html="'mdi-progress-download'" class="ml-2"/>
        </v-btn>
        <div style="margin-top: 25px">
            <v-fade-transition mode="out-in" leave-absolute>
                <div v-if="symbols && !loading" class="symbols-wrapper">
                    <SymbolCard :symbol="symbol" v-for="(symbol,index) in symbols" :key="index"/>
                </div>
            </v-fade-transition>
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
    async loadSymbols(){
        this.loading = true;
        await this.$store.dispatch('loadSymbols')
        this.loading = false;
    }
    async loadSelectList(){
        await this.$store.dispatch('getSymbolsList');
    }

    get symbols(): Currency[] {
        return this.$store.state.blockchainModule.symbols
    }

    get loading() {
        return this.$store.state.blockchainModule.loading
    }
    set loading(v){
        this.$store.state.blockchainModule.loading = v
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
