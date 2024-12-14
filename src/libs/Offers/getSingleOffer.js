import AxiosPublic from "../Axios/AxiosPublic"


export const getSingleOffer = async(id) => {

    const axiosPublic = AxiosPublic();
    const res = await axiosPublic.get(`/api/user/offer/${id}`);

    return res.data;

}