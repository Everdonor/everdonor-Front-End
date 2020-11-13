import Axios from "axios";
import Qs from "qs"

const server = process.env.HOST;

const API = {
    getUsers: (request) => Axios.get(`${server}users`, 
        {...request, 
            paramsSerializer: function (params) {
                return Qs.stringify(params, {arrayFormat: 'comma'})
            },
        }).then(response => response.data),
    searchById: (id) => Axios.get(`${server}users/${id}`).then(response => response.data),
    createUser: (body) => Axios.post(`${server}sign-up`, { ...body }).then(response => response.data),
    loginUser: (body) => Axios.post(`${server}login`, { ...body }).then(response => response.headers),
    modifyUser: (body) => Axios.put(`${server}users/${body.id}`, { ...body }).then(response => response.data),
    modifyUserPassword: ({ oldPassword, newPassword, userId }) =>
        Axios.post(`${server}updatePassword?newPassword=${newPassword}&oldPassword=${oldPassword}&id=${userId}`,
            {}).then(response => response.data),
    reportUser: (id) => Axios.put(`${server}users/${id}/report`).then(response => response.data),
};


export default API