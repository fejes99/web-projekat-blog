import Axios from "axios";

function authorizedRequest(url, method, body = {}, config = {}) {
  const expireTime = sessionStorage.getItem('expire-time');
  const currentTime = Math.round((new Date()).getTime() / 1000);
  if (expireTime - currentTime <= 0) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expire-time');
  }

  const token = sessionStorage.getItem('token');
  
  // if (!token) {
  //   history.push("/login"); //eslint-disable-line
  // }

  switch (method) {
    case 'get': {
      return Axios.get(
        url,
        {
          headers: {"token": token}
        });
    }
    case 'post': {
      return Axios.post(
        url,
        body,
        {
          headers: {"token": token}
        });
    }
    case 'put': {
      return Axios.put(
        url,
        body,
        {
          headers: {"token": token}
        });
    }
    case 'delete': {
      return Axios.delete(
        url, 
        {
          headers: {"token": token}
        });
    }
  }
}

export const protectedPost = (url, body, config) => authorizedRequest(url, 'post', body, config);
export const protectedGet = (url, config) => authorizedRequest(url, 'get', config);
export const protectedPut = (url, body, config) => authorizedRequest(url, 'put', body, config);
export const protectedDelete = (url, config) => authorizedRequest(url, 'delete', config);