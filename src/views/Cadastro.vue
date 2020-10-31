<template>
    <div id="cadastro">
        <h1>Cadastro</h1>
        <input type="text" name="nome" v-model="input.nome" placeholder="Nome" /><br>
        <input type="text" name="email" v-model="input.email" placeholder="E-mail" /><br>
        <input type="text" name="telefone1" v-model="input.telefone1" placeholder="Telefone 1" /><br>
        <input type="text" name="telefone2" v-model="input.telefone2" placeholder="Telefone 2" /><br>
        <input type="text" name="unidadeHabitacional" v-model="input.unidadeHabitacional" placeholder="N. Apartamento" /><br>
        <input type="password" name="senha" v-model="input.senha" placeholder="Senha" /><br>
        <input type="password" name="senha2" v-model="input.senha2" placeholder="Confirmar Senha" /><br>
        <button type="button" v-on:click="cadastrar()" v-bind:disabled="deshabilitarBotao">Cadastrar</button><br>
        <br><span v-if="erro">{{ erro }}</span>
    </div>
</template>

<script>
import {httpService} from '@/services/http';

export default {
    name: 'Cadastro',
    data() {
        return {
            input: { nome: "", email: "", telefone1: "", telefone2: "", unidadeHabitacional: "", senha: "", senha2: ""},
            erro: ""
        }
    },
    computed: {
        deshabilitarBotao() {
            let inp = this.input;

            return !inp.nome || !inp.email || !inp.telefone1 || !inp.unidadeHabitacional || !inp.senha || inp.senha !== inp.senha2;
        }
    },
    methods: {
        cadastrar() {
            if (this.input.email !== "" && this.input.senha !== "") {
                let bodyFormData = new FormData(),
                    baseUrl = "morador";

                bodyFormData.append('nome', this.input.nome);
                bodyFormData.append('email', this.input.email);
                bodyFormData.append('telefonePrimario', this.input.email);
                bodyFormData.append('telefoneSecundario', this.input.email);
                bodyFormData.append('unidadeHabitacional', this.input.unidadeHabitacional);
                bodyFormData.append('senha', this.input.senha);
                bodyFormData.append('condominioId', 1);

                httpService.post(baseUrl, bodyFormData, () => {
                    alert('Morador cadastrado com sucesso!');
                    this.$router.replace({name: "login"});
                }, error => {
                    this.erro = error.response.data.detail;
                });
            } else {
                alert("Informe e-mail e senha");
            }
        }
    }
}
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>
