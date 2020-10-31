<template>
    <div id="app">
        <div><span v-if="getNomeUsuario">Bem vindo, {{getNomeUsuario}}</span></div><br>
        <div id="nav">
            <router-link v-if="authenticated && currentRouteName !== 'home'" to="/Home" replace>Início</router-link>&nbsp;
            <router-link v-if="authenticated && currentRouteName !== 'areasComuns'" to="/areas-comuns" replace>Áreas Comuns</router-link>&nbsp;
            <router-link v-if="authenticated && currentRouteName !== 'meusAgendamentos'" v-bind:to="{ name: 'meusAgendamentos'}" replace>Meus Agendamentos</router-link>&nbsp;
            <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Sair</router-link>&nbsp;
            <router-link v-if="!authenticated && currentRouteName !== 'login'" to="/login" replace>Entrar</router-link>&nbsp;
            <router-link v-if="!authenticated && currentRouteName !== 'cadastro'" to="/cadastro" replace>Cadastro</router-link>
        </div>
        <router-view @authenticated="setAuthenticated" />
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            authenticated: false
        }
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        },
        getNomeUsuario() {
            let usuario = JSON.parse(localStorage.getItem('usuario'));

            if (usuario) {
                return usuario.nome;
            }
            return null;
        }
    },
    mounted() {
        if(!this.authenticated) {
            this.$router.replace({ name: "login" });
        }
    },
    methods: {
        setAuthenticated(status) {
            this.authenticated = status;
        },

        logout() {
            localStorage.setItem('usuario', null);
            this.setAuthenticated(false);
            this.$router.replace({name: "login"});
        }
    }
}
</script>

<style>
* {
    font-family: Verdana;
    font-size: 10pt;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

body {
  background-color: #F0F0F0;
}

h1 {
    padding: 0;
    margin-top: 0;
    font-size: 2em;
    font-weight: bolder;
}
#app {
  width: 700px;
  margin: auto;
}

.loader,
.loader:before,
.loader:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: load7 1.8s infinite ease-in-out;
    animation: load7 1.8s infinite ease-in-out;
}
.loader {
    color: #000000;
    font-size: 10px;
    margin: 80px auto;
    position: relative;
    text-indent: -9999em;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
}
.loader:before,
.loader:after {
    content: '';
    position: absolute;
    top: 0;
}
.loader:before {
    left: -3.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
}
.loader:after {
    left: 3.5em;
}
@-webkit-keyframes load7 {
    0%,
    80%,
    100% {
        box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
        box-shadow: 0 2.5em 0 0;
    }
}
@keyframes load7 {
    0%,
    80%,
    100% {
        box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
        box-shadow: 0 2.5em 0 0;
    }
}
</style>