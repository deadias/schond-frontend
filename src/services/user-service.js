import axios from "axios";

export const userService = {
    login
};

function login(url, email, senha, sucesso, erro) {
    let bodyFormData = new FormData(),
        baseUrl = "http://localhost:8000/api/";

    bodyFormData.append('email', email);
    bodyFormData.append('senha', senha);

    axios.post(baseUrl + url, bodyFormData,{'Content-Type': 'multipart/form-data'}).then(retorno => {
        sucesso(retorno);
    }).catch(error => {
        erro(error);
    });
}
