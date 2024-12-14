'use client';


const Button = ({btnText, icon:Icon, handleClick}) => {
    return (
        <button onClick={handleClick} className="text-xs px-3 py-1 rounded-full text-white bg-primary-color border-2 border-transparent hover:text-primary-color hover:bg-transparent hover:border-primary-color duration-200 flex items-center gap-1 font-semibold">
            <span><Icon className="mt-[1px]" /></span>
            <span>{btnText}</span>
        </button>
    );
};

export default Button;