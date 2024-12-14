import AxiosPublic from "../Axios/AxiosPublic"


export const getCategoryProducts = async(id) => {

    const axiosPublic = AxiosPublic();
    const res = await axiosPublic.get(`/api/user/product/category/${id}`);

    return res.data;

}