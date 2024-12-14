import AxiosPublic from "../Axios/AxiosPublic";


export const getStories = async() => {

    const axiosPublic = AxiosPublic();

    const res = await axiosPublic.get(`/api/user/story/all`);

    return res?.data;

}