import AxiosPublic from "../Axios/AxiosPublic"


export const getCategories = async(id) => {

    const axiosPublic = AxiosPublic();
    const res = await axiosPublic.get(`/api/user/sidebar/${id}`);

    return res.data;

}