<template>
    <div id="agendamentos">
        <h1>Agendamentos</h1>
        <div v-bind:class="{ 'loader': carregando}">
            <table v-if="agendamentos.length && !carregando">
                <thead>
                    <td v-if="!this.meusAgendamentos">Morador</td>
                    <td v-else>Área Comum</td>
                    <td>Apartamento</td>
                    <td>Total de pessoas</td>
                    <td>Data</td>
                    <td>Duração</td>
                    <td>&nbsp;</td>
                </thead>
                <tr v-for="agendamento in agendamentos" v-bind:key="agendamento.id">
                    <td v-if="!isMeusAgendamentos()">{{ agendamento.condominioMorador.morador.nome }}</td>
                    <td v-else>{{ agendamento.areaComum.nome }}</td>
                    <td>{{ agendamento.condominioMorador.unidadeHabitacional }}</td>
                    <td>{{ agendamento.totalPessoas }}</td>
                    <td>{{ agendamento.data }}</td>
                    <td>{{ agendamento.duracao }}</td>
                    <td>
                        <button type="button" v-on:click="cancelar(agendamento.id)">Cancelar</button>
                    </td>
                </tr>
            </table>
            <p v-else>
                Nenhum agendamento cadastrado
            </p>
        </div>
        <br><span v-if="erro">{{ erro }}</span>
    </div>
</template>
<script>
import {httpService} from "@/services/http";
import {authService} from "@/services/auth-service";

export default {
    name: 'AgendamentoLista',
    data() {
        return {
            erro: "",
            agendamentos: {},
            usuario: authService.getUsuario(),
            carregando: false
        };
    },
    methods: {
        isMeusAgendamentos() {
            return this.meusAgendamentos;
        },
        refresh() {
            this.carregando = true;
            let url = "agendamentos/";

            if (this.meusAgendamentos) {
                url += "1/" + this.usuario.id;
            } else {
                url += this.$route.params.areaComumId;
            }

            httpService.get(url,
                retorno => this.agendamentos = retorno.data,
                error => this.erro = error.response.data.detail,
                () => this.carregando = false
            );
        },
        cancelar(id) {
            this.carregando = true;
            this.erro = "";
            httpService.del('agendamento/' + id,
                () =>
                {
                    alert('Agendamento cancelado com sucesso!');
                    this.refresh();
                },
                error => this.erro = error.response.data.detail,
                () => this.carregando = false
            );
        }
    },
    watch:{
        $route(){
            this.refresh();
        }
    },
    mounted() {
        if (this.usuario.admin || this.meusAgendamentos) {
            this.refresh();
        } else {
            this.$router.replace({name: "home"});
        }
    },
    computed: {
        meusAgendamentos() {
            return this.currentRouteName === 'meusAgendamentos';
        },
        adminView() {
            return this.currentRouteName === 'agendamentos';
        },
        currentRouteName() {
            return this.$route.name;
        }
    }
}
</script>

<style scoped>
#agendamentos {
    background-color: #FFFFFF;
    border: 1px solid #CCCCCC;
    padding: 20px;
    margin-top: 10px;
}
td {
    width: auto;
    white-space: nowrap;
}
</style>
