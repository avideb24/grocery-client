import AxiosPublic from "../Axios/AxiosPublic"


export const getSingleProduct = async(id) => {

    const axiosPublic = AxiosPublic();
    const res = await axiosPublic.get(`/api/user/product/${id}`);

    return res.data.data;

}

