import React from 'react'
import { useContext } from 'react';
import { HomeContext } from '../App';
import { Link } from 'react-router-dom';
const Profile = () => {

  const{setShowProfile,showProfile} = useContext(HomeContext)
      return (
        <>
            <div className='absolute font-nuni bg-white5 rounded-2xl w-auto h-auto flex flex-col justify-start px-4 py-5
                            shadow-lg mt-48 duration-200 ease-in-out translate-x-20 md:-translate-x-0'>
                <div className='profile gap-5 '>
                    <Link to="/" className="" >
                        Profile
                    </Link>
                    <Link to="/" className=" px-2 text-center bg-[#4382c1] text-white5 rounded-md" >
                        Soon..
                    </Link>
                </div>
                <div className='profile'>
                    <Link to="/login"
                        onClick={() => {
                            localStorage.setItem("userData", JSON.stringify([]));
                            setShowProfile(!showProfile)
                        }} className="" >
                        Logout
                    </Link> 
                </div>

            </div>
        </>
    )
}

export default Profile