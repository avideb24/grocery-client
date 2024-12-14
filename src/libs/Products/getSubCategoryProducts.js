import AxiosPublic from "../Axios/AxiosPublic"


export const getSubCategoryProducts = async(id) => {

    const axiosPublic = AxiosPublic();
    const res = await axiosPublic.get(`/api/user/product/subCategory/${id}`);

    return res.data;

}