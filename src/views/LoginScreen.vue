<template>
    <div>
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
            <v-snackbar color="primary" v-model="snackbar">
                <div v-html="snackbarMessage" class="text-center"/>
            </v-snackbar>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import {FormState, LoginModel, RegisterModel} from "@/models/Entities/User";
import Vue from "vue";
import Component from "vue-class-component";
import {AxiosError} from "axios";

@Component
export default class LoginScreen extends Vue {
    state: DialogStates = DialogStates.login;
    dialogStates = DialogStates;
    showDialog = true;
    snackbar = false;
    snackbarMessage = '';
    loginForm: LoginModel = new LoginModel()
    registerForm: RegisterModel = new RegisterModel()
    loading = false;
    async login() {
        this.loading = true
        try {
            await this.$store.dispatch('login', this.loginForm);
            this.showDialog = false;
            await this.$router.push('/currency');
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
        } catch (e) {
            const err = e as AxiosError;
            const message = err.response?.data.message
            if (message){
                this.snackbar = true;
                this.snackbarMessage = message;
            }

        }

        finally {
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

enum DialogStates {
    login,
    registration,
}
</script>

<style>
.login-loader {
    margin: 0 !important;
    display: inline-block;
}
.login-loader .ci {
  font-size: 14px !important;
}
</style>
