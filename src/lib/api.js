import urlAssembler from 'url-assembler';
import axios from 'axios';
import Promise from 'bluebird';

const _host = 'https://backend-challenge-summer-2018.herokuapp.com';
const _endpoints = {
  challenges: 'challenges.json',
}

export class ApiWrapper {
  constructor(host = _host, endpoints = _endpoints) {
    this.host = host;
    this.endpoints = endpoints;
  }

  createEndpoint = (endpoint, params) => {
    let url = urlAssembler(this.host)
      .template(endpoint);

    url = Object.keys(params).reduce((col, key) => {
      return col.param(key, params[key]);
    }, url);    

    return url.toString();
  }

  getMenyById = (id, page = 1, menus = []) => {
    return new Promise((resolve, reject) => {
      const endpoint = this.createEndpoint(this.endpoints.challenges, {id, page});

      axios.get(endpoint).then(response => {
        const { data } = response;

        if (!data.pagination) {
          return reject(new Error('No pagination found, API is probably broken.'));
        }

        const totalPages = Math.ceil(data.pagination.total / data.pagination.per_page);
        const resultMenus = [...menus, ...data.menus];

        if (data.pagination.current_page < totalPages) {
          return resolve(this.getMenyById(id, page + 1, resultMenus));
        }

        return resolve(resultMenus);
      }).catch(reject);
    });
  }
}

export default new ApiWrapper();