import axios from 'axios'
import {makeData} from './utils/'

const client = axios.create({baseURL: 'http://jsonplaceholder.typicode.com/posts'})

export function fetchGridData(config) {
  let apiUrl = config.baseUrl ? config.baseUrl : getUrlBasedonEnv(config.env)
  return dispatch => {
    dispatch({type: 'DATA_LOADING', loading: true})
    return client.get(apiUrl)
      .then(res => {
        let data = res.data.data
        return dispatch({type: 'GRID_DATA', score: data, loading: false})
      })
      .catch(exp => {
        dispatch({type: 'DATA_ERROR', error: {message: getErrorMsg(exp)}, loading: false})
      })
  }
}

const getErrorMsg = (exp) => {
  let errMsg = 'Data Not Found'
  if (exp && exp.errorMsg) {
    errMsg = exp.errorMsg
  } else if (exp && exp.response && exp.response.data && exp.response.data.errorMsg) {
    errMsg = exp.response.data.errorMsg
  }
  return errMsg
}

function getUrlBasedonEnv(env) {
  switch (env) {
    case 'dev':
      return 'http://localhost:5009'
    case 'uat':
      return 'http://10.194.80.31:9090'
    case 'prod':
      return 'http://10.194.80.31:9090'
    default:
      return 'http://10.194.80.31:9090'
  }
}