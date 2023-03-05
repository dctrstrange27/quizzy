import React from 'react'
import { Link } from 'react-router-dom';
const Profile = () => {
    return (
        <>
            <div className='absolute font-nuni bg-white5 rounded-2xl w-auto h-auto flex flex-col justify-start px-4 py-5
                            shadow-lg mt-52 duration-200 ease-in-out translate-x-10 md:-translate-x-0'>
                <div className='flex gap-5 hover:bg-[#d3e1ee9b] px-3 rounded-lg py-2'>
                    <Link to="/" className="" >
                        Profile
                    </Link>
                    <Link to="/" className=" px-2 text-center bg-[#4382c1] text-white5 rounded-md" >
                        Soon..
                    </Link>
                </div>
                <div className='flex gap-5 hover:bg-[#d3e1ee9b] px-3 rounded-lg py-2'>
                    <Link to="/login"
                        onClick={() => {
                            localStorage.clear()
                        }} className="" >
                        Logout
                    </Link>

                </div>

            </div>
        </>
    )
}

export default Profile