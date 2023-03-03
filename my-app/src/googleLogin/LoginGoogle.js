import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import jwt_Decode from 'jwt-decode'
const LoginGoogle = () => {
  return (
    <>
      <GoogleLogin theme="filled_black" size="large"
        onSuccess={credentialResponse => {
          const gAcountCredentials = jwt_Decode(credentialResponse.credential)
              console.log(gAcountCredentials)
             //console.log(gAcountCredentials)
           // createGoogleAccount(googleAccountCredentials)
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    
    </>
    )
}

export default LoginGoogle 