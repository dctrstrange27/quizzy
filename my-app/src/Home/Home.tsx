import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Side from '../sideNav/Side'
const Home = () => {
    return (
        <div className='Home relative h-full border-[20px border-r-Ofive'>
            <div className=''>
            <Nav></Nav>
            </div>
            <div className='flex w-full '>
                <Side></Side>     
            </div>
            
        </div>
        
    )
}

export default Home