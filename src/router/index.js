import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from "@/views/Login.vue"
import HomeComponent from "@/views/Home.vue"
import CadastroComponent from "@/views/Cadastro.vue"
import AreasComunsComponent from "@/views/AreasComuns.vue"
import AreaComumFormComponent from "@/components/areasComuns/AreaComumForm"
import AgendamentoComponent from "@/views/Agendamentos.vue"
import AgendamentoForm from "@/components/agendamentos/AgendamentoForm";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {
                name: "home"
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginComponent
        },
        {
            path: "/cadastro",
            name: "cadastro",
            component: CadastroComponent
        },
        {
            path: "/home",
            name: "home",
            component: HomeComponent
        },
        {
            path: "/areas-comuns",
            name: "areasComuns",
            component: AreasComunsComponent
        },
        {
            path: "/areas-comuns/form",
            name: "areasComunsForm",
            component: AreaComumFormComponent
        },
        {
            path: "/agendamentos",
            name: "agendamentos",
            component: AgendamentoComponent
        },
        {
            path: "/agendamentos",
            name: "meusAgendamentos",
            component: AgendamentoComponent
        },
        {
            path: "/agendamento/form",
            name: "agendamentoForm",
            component: AgendamentoForm
        }
    ]
})
