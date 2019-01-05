import axios from 'axios';

const axiosUsers = axios.create({
    baseURL: "https://test-lori-backend.firebaseio.com/"
});

export default axiosUsers;