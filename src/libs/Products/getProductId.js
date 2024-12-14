import AxiosPublic from "../Axios/AxiosPublic"


export const getProductId = async(title) => {

    const axiosPublic = AxiosPublic();
    
    const res = await axiosPublic.get(`/api/user/productId/${title}`);

    return res?.data?.data?.id;

}

