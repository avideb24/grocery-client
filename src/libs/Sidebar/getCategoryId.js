import AxiosPublic from "../Axios/AxiosPublic"


export const getCategoryId = async(title) => {

    const axiosPublic = AxiosPublic();

    const res = await axiosPublic.get(`/api/user/categoryId/${title}`);


    return res?.data?.data?.id;

}