<template>
    <div id="areaComum">
        <h1 v-if="!this.$route.params.areaComumId">Nova Área Comum</h1>
        <h1 v-else-if="this.areaComum">{{this.areaComum.nome}}</h1>
        <input type="text" name="nome" v-model="input.nome" placeholder="Nome" /><br>
        <input type="text" name="capacidade" v-model="input.capacidade" placeholder="Capacidade" /><br>
        <input type="text" name="limitacao" v-model="input.limitacao" placeholder="Limitação" /><br><br>
        <button type="button" v-on:click="salvar()" v-bind:disabled="deshabilitarBotao">
            <span v-if="this.$route.params.areaComumId">Salvar</span>
            <span v-else>Cadastrar</span>
        </button>
        <router-link :to="{ name: 'areasComuns'}" tag="button">
            Cancelar
        </router-link>
        <br>
        <br><span v-if="erro">{{ erro }}</span>
    </div>
</template>
<script>
import {httpService} from "@/services/http";

export default {
    name: 'AreaComumForm',
    data() {
        return {
            input: { nome: "", capacidade: "", limitacao: ""},
            areaComum: null,
            erro: ""
        }
    },
    mounted() {
        if (this.$route.params.areaComumId) {
            let areaComumId = this.$route.params.areaComumId;

            let url = "area-comum/" + areaComumId;

            httpService.get(url,
                retorno => {
                    this.areaComum = retorno.data;
                    this.input.nome = this.areaComum.nome;
                    this.input.capacidade = this.areaComum.capacidade;
                    this.input.limitacao = this.areaComum.limitacao;
                },
                error => this.erro = error.response.data.detail
            );
        }
    },
    computed: {
        deshabilitarBotao() {
            return !this.input.nome || !this.input.capacidade || !this.input.limitacao;
        }
    },
    methods: {
        salvar() {
            if (this.input.nome !== "" && this.input.capacidade !== "" && this.input.limitacao !== "") {
                let bodyFormData = new FormData(),
                    areaComumId = this.areaComum ? "/" + this.areaComum.id : "",
                    url = "area-comum" + areaComumId;

                bodyFormData.append('nome', this.input.nome);
                bodyFormData.append('capacidade', this.input.capacidade);
                bodyFormData.append('limitacao', this.input.limitacao);
                bodyFormData.append('condominioId', 1);

                httpService.post(url,
                    bodyFormData,
                    retorno => {
                        alert('Área Comum atualizada com sucesso!');
                        this.areaComum = retorno.data;
                        this.$router.replace({name: "areasComuns"});
                    },
                    error => this.erro = error.response.data.detail
                );
            } else {
                this.erro = "Informe o nome, capacidade e limitação";
            }
        }
    }
}
</script>

<style scoped>
#areaComum {
    background-color: #FFFFFF;
    border: 1px solid #CCCCCC;
    padding: 20px;
    margin-top: 10px;
}
</style>
