'use client'

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ErrorAlert from '@/components/ErrorAlert';
import { POST } from '../api/api';
import GoogleAuthProvider from '@/components/GoogleAuthProvider';

function Login() {
  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userInput = { email, password };
      const response = await POST('login', userInput)
      // const response = await login({ user: userInput }).unwrap();
      const { user } = response.data;
      // const { authorization } = response.headers;
      // const token = authorization.replace('Bearer ', '');
      // dispatch(setCredentials({ user, token }));
      // localStorage.setItem('PB-JWT-TOKEN', token);
      setEmail('');
      setPassword('');
      // router.push('/dashboard');
    } catch (error) {
      if (error.status === 401) {
        setErrMsg(error.data.data.error);
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const clearErrors = () => setErrMsg('');

  const content = (

    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="mb-8">
          {errMsg ? <ErrorAlert clearErrors={clearErrors} messages={[errMsg]} /> : null}
        </div>
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="mt-2">
                <label htmlFor="email">
                  <p className="block text-sm font-medium leading-6 text-gray-900">Email</p>
                  <input
                    type="email"
                    id="email"
                    ref={emailRef}
                    value={email}
                    onChange={handleEmailInput}
                    autoComplete="on"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="current-password">
                <p className="block text-sm font-medium leading-6 text-gray-900">Password</p>
                <input
                  type="password"
                  id="current-password"
                  onChange={handlePasswordInput}
                  value={password}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </label>
            </div>

            <div className="flex items-center justify-between">

              <div className="text-sm leading-6">
                <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Don&apos;t have an account yet?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={false}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <div>
            <div className="relative mt-10">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">Or continue with</span>
              </div>
            </div>

            <div className="w-1/2 mt-6 m-auto">
              <GoogleAuthProvider />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return content;
}
export default Login;
