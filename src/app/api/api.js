import { setToken, getToken } from "../utils/apiHelper";

let BASE_URL;

if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://path-buddy-4102d3465248.herokuapp.com/api/v1';
} else {
  BASE_URL = 'http://localhost:3001/api/v1';
}

export async function GET(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    return response.data;
  } catch (error) {

    throw error;
  }
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

    setToken(response.headers.get('authorization').replace('Bearer ', ''));
    
    const responseHeaders = {
      'content-type': response.headers.get('content-type'),
    };

    if (!response.ok) {
      throw new Error('Request failed with status: ' + response.status);
    }
    const data = await response.json();

    return { status, responseHeaders, data }
  } catch (error) {
    console.log(error)
    throw error;
  }
}
