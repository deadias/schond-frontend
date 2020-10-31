<template>
    <div id="home">
        <h1>Este é o Smart Condomínio</h1>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        let usuario = JSON.parse(localStorage.getItem('usuario'));

        if (!usuario || !usuario.token) {
            this.$emit("authenticated", false);
            this.$router.replace({name: "login"});
        } else {
            this.$emit("authenticated", true);
        }

        return {
            usuario: usuario
        };
    }
}
</script>

<style scoped>
    #home {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>
