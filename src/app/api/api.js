const BASE_URL = 'http://localhost:3001/api/v1';

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

    const headers = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('PB-JWT-TOKEN')

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Request failed with status: ' + response.status);
    }
    const data = await response.json();

    return data
  } catch (error) {
    throw error;
  }
}
