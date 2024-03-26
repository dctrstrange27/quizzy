import { GoogleLogin } from '@react-oauth/google';
import jwt_Decode from 'jwt-decode'



const LoginGoogle = ({handleLogin}:{handleLogin:(data)=>void, referrerpolicy:string}) => {
  return (
    <>
      <GoogleLogin theme="filled_black" size="large"
        onSuccess={credentialResponse => {
          const gAcountCredentials = jwt_Decode(credentialResponse.credential)
              handleLogin(gAcountCredentials)
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </>
    )
}

export default LoginGoogle 