import axios from 'axios';

let BASE_URL = 'https://api.twickr.live';
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:8000';
}
if (process.env.REACT_APP_ENV_OVERRIDE === 'docker') {
  BASE_URL = 'http://172.17.0.1:8000';
}

export default axios.create({
  baseURL: `${BASE_URL}/twickr/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});
