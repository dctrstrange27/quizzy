import React, { useDebugValue } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Side from '../sideNav/Side'
const Home = () => {
    return (
        <div className='Home relative h-full border-[5px border-r-Ofive'>
            <div className=''>
            <Nav></Nav>
            </div>
            <div className='flex w-full h-[2vh] border-[5px] border-r-Ofive'>
                <Side></Side>     
            </div>
            <Outlet />
        </div>
        
    )
}

export default Home