import React from 'react'
import LoginGoogle from '../googleLogin/LoginGoogle'
const Login = () => {
  return (
    <>
      <div className='w-full h-screen flex justify-center items-center  '>
        <div className='w-full flex flex-col mx-3 justify-center items-center border-[1px] border-r-dark_del_btn h-auto   max-w-xl'>
          <h1 className=' font-pacifico text-b1 text-2xl tracking-wide'>Grow your mind</h1>
          <p className='font-nuni'>All our dreams can come true if we have the courage to pursue them.</p>
          <LoginGoogle></LoginGoogle>
        </div>
      </div>

    </>
  )
}

export default Login