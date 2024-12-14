'use client'

import Button from "@/components/shared/Buttons/Button/Button";
import { IoMdRefresh } from "react-icons/io";


export default function Error({ error, reset }) {
    return (
        <div className="py-8 space-y-3">
            <h2 className="text-lg md:text-xl font-semibold">Something went wrong!</h2>
            <Button btnText={'Try Again'} icon={IoMdRefresh} handleClick={() => reset()} />
        </div>
    )
}
