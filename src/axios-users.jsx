import axios from 'axios';

const axiosUsers = axios.create({
     baseURL: "http://localhost:9004"
});

 axiosUsers.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export default axiosUsers;