<template>
    <div id="login">
        <h1>Entrar</h1>
        <input type="text" name="email" v-model="input.email" placeholder="E-mail" /><br>
        <input type="password" name="senha" v-model="input.senha" placeholder="Senha" /><br><br>
        <button type="button" v-on:click="login()" v-bind:disabled="!input.email || !input.senha">Login</button>
        <br><span v-if="erro">{{ erro }}</span>
    </div>
</template>

<script>
import {userService} from "@/services/user-service";

export default {
    name: 'Login',
    data() {
        return {
            input: {email: "", senha: ""},
            erro: ""
        }
    },
    methods: {
        login() {
            if (this.input.email !== "" && this.input.senha !== "") {
                userService.login(
                    "login",
                    this.input.email,
                    this.input.senha,
                    retorno => {
                        localStorage.setItem('usuario', JSON.stringify(retorno.data));
                        this.$emit("authenticated", true);
                        this.$router.replace({name: "home"});
                    },
                    error => {
                        this.erro = error.response.data.detail;
                        localStorage.setItem('usuario', null);
                    }
                );
            } else {
                alert("Informe usuário e senha");
            }
        }
    }
}
</script>

<style scoped>
    #login {
        width: 300px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin-top: 20px;
        padding: 20px;
    }
</style>
