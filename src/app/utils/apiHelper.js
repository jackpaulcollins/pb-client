export const setToken = (token) => {
  localStorage.setItem('PB-JWT-TOKEN', token);
}

export const getToken = () => {
  return localStorage.getItem('PB-JWT-TOKEN');
}