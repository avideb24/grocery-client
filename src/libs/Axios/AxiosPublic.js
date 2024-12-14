import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:4000'
})

const AxiosPublic = () => {
    return axiosPublic;
};

export default AxiosPublic;