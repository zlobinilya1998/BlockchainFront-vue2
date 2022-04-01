<template>
    <v-app>
        <Header/>
        <v-main class="secondary">
            <div class="pa-5">
                <v-fade-transition>
                    <router-view/>
                </v-fade-transition>
            </div>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from "@/components/common/Header.vue";
import Component from "vue-class-component";


@Component({
    components: {Header}
})
export default class App extends Vue {

}
</script>
