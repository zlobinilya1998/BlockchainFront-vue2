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

        <v-btn color="secondary" @click="showDialog = true">
            <span class="mr-2">Вход</span>
            <v-icon>mdi-login-variant</v-icon>
        </v-btn>

        <v-dialog v-model="showDialog" overlay-color="secondary" max-width="450" persistent>
            <v-card class="pa-5">
                <v-fade-transition mode="out-in" group leave-absolute>
                    <v-form key="1" v-if="state === dialogStates.login">
                        <v-text-field
                            label="E-mail"
                            :rules="[]"
                            hide-details="auto"
                            v-model="loginForm.email"
                        />
                        <v-text-field
                            label="Пароль"
                            :rules="[]"
                            hide-details="auto"
                            v-model="loginForm.password"
                        />
                    </v-form>
                    <v-form key="2" v-else-if="state === dialogStates.registration">
                        <v-text-field
                            label="Логин"
                            :rules="[]"
                            hide-details="auto"
                            v-model="registerForm.login"
                        />
                        <v-text-field
                            label="E-mail"
                            :rules="[]"
                            hide-details="auto"
                            v-model="registerForm.email"
                        />
                        <v-text-field
                            label="Пароль"
                            :rules="[]"
                            hide-details="auto"
                            type="password"
                            v-model="registerForm.password"
                        />
                    </v-form>
                </v-fade-transition>
                <v-card-actions v-if="state === dialogStates.login" class="pa-0 mt-4">
                    <v-btn
                        color="green darken-1"
                        text
                        @click="state = dialogStates.registration"
                        v-html="'Регистрация'"
                    />
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        text
                        @click="login"
                        v-html="'Вход'"
                    />

                </v-card-actions>
                <v-card-actions v-else-if="state === dialogStates.registration" class="pa-0 mt-4">
                    <v-btn
                        color="green darken-1"
                        text
                        @click="setOnLogin"
                        v-html="'Назад'"
                    />
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="register"
                        v-html="'Зарегистрироваться'"
                    />
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app-bar>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import {FormState, LoginModel, RegisterModel} from "@/models/Entities/User";

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

enum DialogStates {
    login,
    registration,
}

@Component
export default class Header extends Vue {
    state: DialogStates = DialogStates.login;
    dialogStates = DialogStates;
    showDialog = false


    loginForm: LoginModel = new LoginModel()
    registerForm: RegisterModel = new RegisterModel()
    loading = false;
    async login() {
        this.loading = true
        try {
            await this.$store.dispatch('login', this.loginForm);
            this.showDialog = false;
            await this.$router.push('/');
        } finally {
            this.loading = false
        }
    }
    async register(){
        this.loading = true;
        try {
            await this.$store.dispatch('register', this.registerForm);
            this.showDialog = false;
            await this.$router.push('/');
        } finally {
            this.loading = false;
        }
    }
    setOnLogin(){
        this.state = DialogStates.login;
    }
    setOnRegister(){
        this.state = DialogStates.registration;
    }
}
</script>

