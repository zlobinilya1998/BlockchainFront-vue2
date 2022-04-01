<template>
    <span>
       <Header/>
        <router-view/>
    </span>
</template>


<script lang="ts">
import Header from "@/components/common/Header.vue";
import Component from "vue-class-component";
import Vue from "vue";

@Component({
    components: {
        Header,
    }
})

export default class App extends Vue {

}
</script>
