<template>
    <v-app-bar
        app
        color="primary"
        dark
    >
        <div class="d-flex align-center">
            <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                transition="scale-transition"
                width="40"
            />

            <v-img
                alt="Vuetify Name"
                class="shrink mt-1 hidden-sm-and-down"
                contain
                min-width="100"
                src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                width="100"
            />
        </div>

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

const headerLinks: HeaderBtn[] = [
    {
        text: 'Главная',
        pathName: '/',
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

interface HeaderBtn {
    text: string,
    pathName: string,
    icon?: string,
}



@Component
export default class Header extends Vue {
    get isLoggedIn(){
        return this.$store.state.userModule.isLoggedIn;
    }
    logout(){
        this.$store.dispatch('userModule/logout');
        this.$router.push('/login')
    }
}
</script>

