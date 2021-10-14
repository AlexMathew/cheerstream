import axios from 'axios';

let BASE_URL = 'https://api.twickr.live';
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:8000';
}

export default axios.create({
  baseURL: `${BASE_URL}/trackr/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});
