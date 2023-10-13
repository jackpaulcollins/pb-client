import { setToken, getToken } from "../utils/apiHelper";

let BASE_URL;

if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://path-buddy-4102d3465248.herokuapp.com/api/v1';
} else {
  BASE_URL = 'http://localhost:3001/api/v1';
}

export async function GET(endpoint) {
  const requestHeaders = {
    'Content-Type': 'application/json',
  };

  const token = getToken();

  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, { headers: requestHeaders });
    const { status } = response;
    const data = await response.json();
    return { status, data }
  } catch (error) {

    throw error;
  }
}

export async function VERIFY(){
  const token = getToken();
  
  if (!token) {
    return window.location.href = '/login';
  }

  const response = await fetch(`${BASE_URL}/tokens/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });

  const { status } = response;

  const responseHeaders = {
    'content-type': response.headers.get('content-type'),
  };

  if (response.status === 403 && !response.ok){
    return window.location.href = '/login';
  }

  if (!response.ok) {
    throw new Error('Request failed with status: ' + response.status);
  }
  const data = await response.json();

  return { status, responseHeaders, data }
}

export async function POST(endpoint, body = {}) {
  try {

    const requestHeaders = {
      'Content-Type': 'application/json',
    };

    const token = getToken();

    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(body),
    });

    const { status } = response;
    const responseToken = response.headers.get('authorization');

    if (responseToken) {
      setToken(responseToken.replace('Bearer ', ''));
    }
    
    const responseHeaders = {
      'content-type': response.headers.get('content-type'),
    };

    if (!response.ok) {
      throw new Error('Request failed with status: ' + response.status);
    }
    const data = await response.json();

    return { status, responseHeaders, data }
  } catch (error) {
    console.log(error, "endpoint: ", endpoint)
    throw error;
  }
}
