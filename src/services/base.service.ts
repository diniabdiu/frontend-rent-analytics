import axios from 'axios';

class BaseService {
  baseUrl = process.env.REACT_APP_API_URL;

  get axios() {
    return axios.create({
      baseURL: this.baseUrl,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

}

export default BaseService;
