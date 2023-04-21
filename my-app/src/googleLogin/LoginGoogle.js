import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import {useGoogleOneTapLogin} from "@react-oauth/google"
import jwt_Decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
const LoginGoogle = ({handleLogin}) => {
  const Navigate = useNavigate()
  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      const gAcountCredentials = jwt_Decode(credentialResponse.credential)
      handleLogin(gAcountCredentials)
      Navigate("/shared")
    },
    onError: () => {
      console.log('Login Failed');
    }
  });

  return (
    <>
      <GoogleLogin theme="filled_black" size="large"
        onSuccess={credentialResponse => {
          const gAcountCredentials = jwt_Decode(credentialResponse.credential)
              handleLogin(gAcountCredentials)
              Navigate("/shared")
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    
    </>
    )
}

export default LoginGoogle 