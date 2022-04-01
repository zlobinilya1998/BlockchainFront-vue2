<template>
    <header class="header">
        <router-link :to="btn.pathName" v-for="(btn,index) in headerLinks" :key="index">
            <v-btn>
                {{btn.text}}
                <c-icon v-if="btn.icon" v-html="btn.icon" style="margin-left: 3px"/>
            </v-btn>
        </router-link>
    </header>
</template>

<script lang="ts">
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
</script>

<style scoped>
.header {
    margin-bottom: 25px;
}
</style>
