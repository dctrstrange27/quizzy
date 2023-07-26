import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
const LoginFirstModal = ({showModal,setShowModal,hasLogin}) => {

  return (
    <>
    {showModal && <>
    <div
      className="justify-center z-[9999] backdrop-blur-sm items-center flex overflow-x-hidden overflow-y-auto fixed inset-0  outline-none focus:outline-none"
    >
      <div className="relative w-auto bg-[#ffffff]  rounded-2xl my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex border-[1px bg-[#eeeeee] rounded-t-xl items-start justify-between p-5 border-solid border-slate-200">
            <h3 className="text-2xl font-nuni font-bold ">
              Looks like haven't signed it yet!
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
      
          {/*footer*/}
          <div className="flex items-center justify-center p-6  border-slate-200 rounded-b">
            <Link to="/login" onClick={()=>{setShowModal(false)}}>
            <button
              className="questionB"
              type="button"
            >
              Login
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>}    
    </>
  )
}

export default LoginFirstModal