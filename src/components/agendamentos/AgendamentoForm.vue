<template>
    <div id="agendamento">
        <h1>Novo Agendamento</h1>
        <h2 v-if="this.areaComum">{{this.areaComum.nome}}</h2>
        Data:
        <br>
        <div style="display: flex">
            <datepicker name="data" placeholder="Selecione a data..." format="dd/MM/yyyy" :language="ptBR" v-model="input.data" :clear-button="true" :disabled-dates="disabledDates" :highlighted="highlighted"></datepicker>
            <vue-timepicker v-model="input.hora"></vue-timepicker>
        </div>
        <br>
        Total de pessoas:
        <br><vue-number-input :inputtable="false" name="totalPessoas" v-model="input.totalPessoas" :min="1" :max="10" size="small" inline controls center></vue-number-input><br><br>

        Duração em minutos:
        <br><vue-number-input :inputtable="false" name="duracao" v-model="input.duracao" :min="20" :max="120" :step="10" size="small" inline controls center></vue-number-input><br><br>

        <button type="button" v-on:click="salvar()" v-bind:disabled="deshabilitarBotao">
            <span v-if="this.$route.params.areaComumId">Salvar</span>
            <span v-else>Cadastrar</span>
        </button>
        <router-link :to="{ name: 'areasComuns'}" tag="button">Cancelar</router-link>
        <br>
        <br><span v-if="erro">{{ erro }}</span>
    </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import {httpService} from "@/services/http";
import {ptBR} from 'vuejs-datepicker/dist/locale'
import VueNumberInput from '@chenfengyuan/vue-number-input';
import {authService} from "@/services/auth-service";

export default {
    name: 'AgendamentoForm',
    components: {
        Datepicker,
        VueNumberInput,
        VueTimepicker
    },
    data() {
        return {
            disabledDates: {
                to: null
            },
            highlighted: {
                dates: [new Date()]
            },
            ptBR: ptBR,
            input: { data: "", hora: "", totalPessoas: 1, duracao: 20},
            areaComum: null,
            erro: ""
        }
    },
    mounted() {
        let date = new Date();
        date.setDate(date.getDate() - 1);
        this.disabledDates.to = date;

        if (this.$route.params.areaComumId) {
            let areaComumId = this.$route.params.areaComumId;

            let url = "area-comum/" + areaComumId;

            httpService.get(url,
                retorno => {
                    this.areaComum = retorno.data;
                },
                error => this.erro = error.response.data.detail
            );
        }
    },
    computed: {
        deshabilitarBotao() {
            return !this.input.data || !this.input.hora || !this.input.totalPessoas || !this.input.duracao;
        }
    },
    methods: {
        salvar() {
            if (this.input.data !== "" && this.input.hora !== "" && this.input.totalPessoas !== "" && this.input.duracao !== "") {
                let bodyFormData = new FormData(),
                    url = "agendamento",
                    inputData = this.input.data,
                    data = `${inputData.getDate()}/${inputData.getMonth() + 1}/${inputData.getFullYear()} ${this.input.hora}:00`;

                bodyFormData.append('areaComumId', this.$route.params.areaComumId);
                bodyFormData.append('condominioMoradorId', authService.getUsuario().condominioMoradorId);
                bodyFormData.append('data', data);
                bodyFormData.append('total_pessoas', this.input.totalPessoas);
                bodyFormData.append('duracao', this.input.duracao);

                httpService.post(url,
                    bodyFormData,
                    () => {
                        alert('Agendamento cadastrado com sucesso!');
                        this.$router.replace({name: "meusAgendamentos"});
                    },
                    error => this.erro = error.response.data.detail
                );
            } else {
                this.erro = "Informe a data, total de pessoas e duração em minutos";
            }
        }
    }
}
</script>

<style scoped>
#agendamento {
    background-color: #FFFFFF;
    border: 1px solid #CCCCCC;
    padding: 20px;
    margin-top: 10px;
}
</style>
