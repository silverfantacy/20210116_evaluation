import _axios from '../api'

const url = 'https://script.google.com/macros/s/AKfycbyTIFz7xtHEp8xiomayZb7yEMxdMPTsNwqXrjYG61rmeq6YNGVSfwM1eg/exec'

const get = () => {
  let config = {
    method: 'get',
    url: ``,
    params: {
      url
    }
  }
  return _axios(config)
}


export default {
  get,
}
