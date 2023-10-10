import { useUserContext } from '@/app/contexts/UserStore';
import { GoogleLogin } from '@react-oauth/google';
import { POST } from '@/app/api/api';
import { useRouter } from 'next/navigation';

function GoogleAuthProvider() {
  const router = useRouter();
  const { dispatch } = useUserContext();

  const signUpFromOauth = async (token) => {
    const body = { credentials: { provider: 'google', token }}
    const response = await POST('users/oauth/register', body)
    const { user } = response.data
    dispatch({ type: "SET_USER", payload: user })
    router.push('/dashboard');
  }

  const responseMessage = (response) => {
    const { credential } = response;

    signUpFromOauth(credential);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
  );
}
export default GoogleAuthProvider;
