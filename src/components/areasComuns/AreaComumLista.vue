<template>
    <div id="areasComuns">
        <br><span v-if="erro">{{ erro }}</span>
        <h1>Áreas Comuns</h1>
        <router-link to="/areas-comuns/form" replace tag="button" v-if="usuario.admin">
            Adicionar
        </router-link>&nbsp;
        <div v-bind:class="{ 'loader': carregando}">
            <table v-if="areasComuns.length && !this.carregando">
                <thead>
                    <td>Nome</td>
                    <td>Capacidade</td>
                    <td>Limitação</td>
                    <td>&nbsp;</td>
                </thead>
                <tr v-for="areaComum in areasComuns" v-bind:key="areaComum.id">
                    <td>{{ areaComum.nome }}</td>
                    <td>{{ areaComum.capacidade }}</td>
                    <td>{{ areaComum.limitacao }}</td>
                    <td>
                        <div style="display: flex;">
                            <router-link :to="{ name: 'agendamentoForm', params: { areaComumId: areaComum.id }}" tag="button">
                                Agendar
                            </router-link>
                            <span v-if="usuario.admin">
                                <router-link :to="{ name: 'agendamentos', params: { areaComumId: areaComum.id }}" tag="button">
                                    Agendamentos
                                </router-link>
                                <router-link :to="{ name: 'areasComunsForm', params: { areaComumId: areaComum.id }}" tag="button">
                                    Editar
                                </router-link>
                                <button type="button" v-on:click="remover(areaComum.id)">Remover</button>
                            </span>
                        </div>
                    </td>
                </tr>
            </table>
            <p v-else>
                Nenhum condomínio cadastrado
            </p>
        </div>
    </div>
</template>
<script>
import {httpService} from "@/services/http";
import {authService} from "@/services/auth-service";

export default {
    name: 'AreaComunLista',
    data() {
        return {
            erro: "",
            areasComuns: {},
            usuario: authService.getUsuario(),
            carregando: false
        };
    },
    methods: {
        refresh() {
            this.carregando = true;
            let url = "areas-comuns/1";

            httpService.get(url,
                retorno => this.areasComuns = retorno.data,
                error => this.erro = error.response.data.detail,
                () => this.carregando = false
            );
        },
        remover(id) {
            this.carregando = true;
            httpService.del('area-comum/' + id,
                () =>
                {
                    alert('Area Comum removida com sucesso!');
                    this.refresh();
                },
                error => this.erro = error.response.data.detail,
                () => this.carregando = false
            );
        }
    },
    mounted () {
        this.refresh();
    },
}
</script>

<style scoped>
#areasComuns {
    background-color: #FFFFFF;
    border: 1px solid #CCCCCC;
    padding: 20px;
    margin-top: 10px;
}
</style>
