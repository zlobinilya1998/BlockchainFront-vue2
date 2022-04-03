<template>
    <v-app-bar
        app
        color="primary"
        dark
    >
        <v-layout>
            <v-btn color="secondary"  class="mr-2" v-for="(btn,i) in headerLinks" :key="i" v-html="btn.text" @click="$router.push(btn.pathName)"/>
        </v-layout>

        <v-spacer></v-spacer>

        <v-btn v-if="isLoggedIn" color="secondary" @click="logout">
            <span class="mr-2">Выход</span>
            <v-icon>mdi-login-variant</v-icon>
        </v-btn>
        <v-btn v-else color="secondary" @click="$router.push('/login')">
            <span class="mr-2">Вход</span>
            <v-icon>mdi-login-variant</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

type HeaderBtn = {
    text: string,
    pathName: string,
    icon?: string,
}

@Component
export default class Header extends Vue {
    headerLinks: HeaderBtn[] = [
        {
            text: 'Валюта',
            pathName: '/currency',
        },
        {
            text: 'Тренды',
            pathName: '/trends',
        },
        {
            text: 'Страница иконок',
            pathName: '/admin/icons',
            icon: 'ci-cog',
        },
    ]
    get isLoggedIn(){
        return this.$store.state.userModule.isLoggedIn;
    }
    logout(){
        this.$store.dispatch('userModule/logout');
        this.$router.push('/login')
    }
}
</script>

