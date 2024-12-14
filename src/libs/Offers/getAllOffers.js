import AxiosPublic from "../Axios/AxiosPublic"


export const getAllOffers = async() => {

    const axiosPublic = AxiosPublic();
    const res = await axiosPublic.get('/api/user/offer/all');

    return res.data.data;

}