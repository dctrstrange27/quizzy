import React from 'react'
import LoginGoogle from '../googleLogin/LoginGoogle'
const Login = ({handleLogin}) => {
  return (
    <>
      <div className='w-full h-screen  flex justify-center items-center'>
        <div className='w-full flex flex-col mx-3 justify-center items-center border-[1px
                       border-[#1e1e1e74] bg-white5 h-auto max-w-xl gap-4 px-11 py-20
                       rounded-lg shadow-lg '>
          <h1 className=' font-pacifico text-b1 text-4xl mb-11 tracking-wide'>Grow your mind</h1>
          <p className='font-nuni'>All our dreams can come true if we have the courage to pursue them.</p>
          <LoginGoogle handleLogin={handleLogin} ></LoginGoogle>
        </div>
      </div>

    </>
  )
}

export default Login