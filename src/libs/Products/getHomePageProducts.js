import AxiosPublic from "../Axios/AxiosPublic"


export const getHomePageProducts = async(id) => {

    const axiosPublic = AxiosPublic();
    
    const res = await axiosPublic.get(`/api/user/product/mainCategory/${id}`);

    if(res.data.success){
        return res.data.data;
    }
    else{
        return false;
    }

}

