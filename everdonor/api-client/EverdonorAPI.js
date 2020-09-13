import Axios from "axios";

const server = "http://localhost:8080/";

const API = {
    getUsers: () => Axios.get(`${server}users`).then(response => response.data),
    searchByName: (name) => Axios.get(`${server}users?name=${name}`).then(response => response.data),
    searchByType: (type) => Axios.get(`${server}users?type=${type}`).then(response => response.data),
    /*post: (path, body) => axios.post(`${server}${path}`, body).then(response => response.data),*/
};


export default API