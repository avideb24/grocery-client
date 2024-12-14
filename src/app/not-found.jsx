import LinkButton from '@/components/shared/Buttons/LinkButton/LinkButton';
import img from '@/assets/404-img.png';
import Image from "next/image";
import { IoMdHome } from "react-icons/io";
import PageTitle from '@/components/shared/PageTitle/PageTitle';


const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
             <PageTitle title={'Not Found'} />
            <div className="-mt-40">
                <Image src={img} className="mx-auto" alt="404 Image" />
                <h1 className="text-sm md:text-2xl font-bold mt-2 mb-6">Your requested page was not found!</h1>
                <div className='text-center'>
                    <LinkButton btnText={'Go Home'} linkTo={'/'} icon={IoMdHome} />
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
