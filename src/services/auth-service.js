export const authService = {
    authHeader,
    getUsuario
};

function getUsuario() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario || !usuario.id || !usuario.token) {
        throw 'Usuário não logado.';
    }
    return usuario;
}

function authHeader() {
    let usuario = getUsuario();

    if (!usuario) {
        return {};
    }

    return {
        "Content-Type": "application/json",
        "Authorization": usuario.token,
        "id": usuario.id,
    };
}
