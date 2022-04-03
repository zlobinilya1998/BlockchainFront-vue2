<template>
    <div class="about secondary">
        <v-btn :loading="loading" color="primary" class="my-3" @click="loadSymbols">
            Загрузить
            <v-icon v-html="'mdi-progress-download'" class="ml-2"/>
        </v-btn>

        <div style="margin-top: 25px">
            <v-fade-transition mode="out-in" leave-absolute>
                <div v-if="paginatedSymbols && !loading">
                    <v-slide-x-transition mode="out-in">
                        <div class="symbols-wrapper" :key="page">
                            <SymbolCard :symbol="symbol" v-for="(symbol,index) in paginatedSymbols" :key="index"/>
                        </div>
                    </v-slide-x-transition>
                    <v-pagination v-model="page" :length="maxLength" class="mt-5"/>
                </div>
            </v-fade-transition>
        </div>
    </div>
</template>

<script lang="ts">
import {Currency, Status} from "@/models/Entities/Currency";
import SymbolCard from "@/components/symbols/SymbolCard.vue";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({
    components: {
        SymbolCard,
    }
})
export default class SymbolsScreen extends Vue {
    statuses = Status

    page = 1;
    itemsPerPage = 12;
    async loadSymbols() {
        this.loading = true;
        await this.$store.dispatch('loadSymbols')
        this.loading = false;
    }
    @Watch('page')
    setFilterOnUri(val: any){
        this.$router.push({ path: 'currency', query: { page: val }})
    }
    async loadSelectList() {
        await this.$store.dispatch('getSymbolsList');
    }
    initQueryString(){
        const page = +this.$route.query.page
        if (page > 0 && page <= this.maxLength) this.page = page
    }

    get maxLength(){
        const symbols = Object.keys(this.symbols).length;
        return Math.floor(symbols / this.itemsPerPage)
    }
    get symbols(): Currency[] {
        return this.$store.state.blockchainModule.symbols
    }

    get paginatedSymbols(){
        const symbols = Object.entries(this.symbols);
        const start = this.page * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return Object.fromEntries(symbols.slice(start, end));
    }
    get loading() {
        return this.$store.state.blockchainModule.loading
    }

    set loading(v) {
        this.$store.state.blockchainModule.loading = v
    }

    mounted() {
        this.initQueryString();
        this.loadSymbols();
        this.loadSelectList();
    }
}
</script>


<style lang="scss">
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
