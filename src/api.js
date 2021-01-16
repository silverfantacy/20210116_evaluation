const axios = require('axios').default;

const axiosInstance = axios.create({
  baseURL: 'https://script.google.com/macros/s/AKfycbwyzSIPUB4RUhmf1-th6vQDd5uGfGGekrkYLydm2rda3BNfi_kj44R3/exec'
});

export default function (options) {
  options['headers'] = {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
  }

  return new Promise((resolve, reject) => {
    axiosInstance
      .request(options)
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err.response)
      })
  })
}
