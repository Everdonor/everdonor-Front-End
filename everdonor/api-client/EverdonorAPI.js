import Axios from "axios";

const server = "http://localhost:8080/";


const API = {
    getUsers: () => Axios.get(`${server}users`).then(response => response.data),
    searchByName: (name) => Axios.get(`${server}users?name=${name}`).then(response => response.data),
    searchByType: (typeList) => {
        var types = Object.keys(typeList).map(key => "types" + '=' + typeList[key]).join('&');
        return Axios.get(`${server}users?${types}`).then(response => response.data);
    },
    searchById: (id) => Axios.get(`${server}users/${id}`).then(response => response.data),
    searchByRadius: ({ longitude, latitude, distance }) => Axios.get(`${server}users?latitude=${latitude}&longitude=${longitude}&distance=${distance}`).then(response => response.data),
    createUser: (body) => Axios.post(`${server}sign-up`, { ...body }).then(response => response.data),
    loginUser: (body) => Axios.post(`${server}login`, { ...body }).then(response => response.headers),
    modifyUser: (body) => Axios.put(`${server}users/${body.id}`, { ...body }).then(response => response.data),
    modifyUserPassword: ({ oldPassword, newPassword, userId }) =>
        Axios.post(`${server}updatePassword?newPassword=${newPassword}&oldPassword=${oldPassword}&id=${userId}`,
            {}).then(response => response.data),
    reportUser: (id) => Axios.put(`${server}users/${id}/report`).then(response => response.data),
};


export default API