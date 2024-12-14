import AxiosPublic from "../Axios/AxiosPublic"


export const getOfferId = async(title) => {

    const axiosPublic = AxiosPublic();
    const res = await axiosPublic.get(`/api/user/offerId/${title}`);

    return res.data.data;

}