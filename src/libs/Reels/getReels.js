import AxiosPublic from "../Axios/AxiosPublic";


export const getReels = async() => {

    const axiosPublic = AxiosPublic();

    const res = await axiosPublic.get('/api/user/reels/all');

    return res?.data?.data;

};