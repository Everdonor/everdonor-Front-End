import Axios from "axios";

const server = "http://localhost:8080/";

const API = {
    getUsers: () => Axios.get(`${server}users`).then(response => response.data),
    searchByName: (name) => Axios.get(`${server}searchUser?q=${name}`).then(response => response.data),
    /*post: (path, body) => axios.post(`${server}${path}`, body).then(response => response.data),*/
};


export default API