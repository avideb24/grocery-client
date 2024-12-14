import AxiosPublic from "../Axios/AxiosPublic"


export const getSubCategoryId = async(title) => {

    const axiosPublic = AxiosPublic();

    const res = await axiosPublic.get(`/api/user/subCategoryId/${title}`);


    return res?.data?.data?.id;

}