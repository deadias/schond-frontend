import axios from "axios";
import {authService} from "./auth-service";

export const httpService = {
    get,
    post,
    del
};

const baseUrl = 'http://localhost:8000/api/';

function get(url, sucesso, erro, finalmente) {
    let headers = authService.authHeader();

    headers["Content-Type"] = "application/json",

    axios.get(baseUrl + url, {headers}).then(retorno => {
        sucesso(retorno);
    }).catch(error => {
        erro(error);
    }).finally(() => {
        if (finalmente) {
            finalmente();
        }
    });
}

function post(url, data, sucesso, erro) {
    let headers = url.includes('morador') ? {} : authService.authHeader();

    axios.post(baseUrl + url, data, {headers}).then(retorno => {
        sucesso(retorno);
    }).catch(error => {
        erro(error);
    });
}

function del(url, sucesso, erro, finalmente) {
    let headers = authService.authHeader();

    axios.delete(baseUrl + url, {headers}).then(retorno => {
        sucesso(retorno);
    }).catch(error => {
        erro(error);
    }).finally(() => {
        if (finalmente) {
            finalmente();
        }
    });
}
