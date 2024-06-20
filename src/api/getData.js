import request from '@/utils/request.js'
import axios from 'axios';


export const newUser = (param) => {
  return request.post('/user/new', JSON.stringify(param), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export const addUser = (param) =>{
  // return axios({
  //   method: 'post',
  //   baseURL: `${baseUrl}/user/add`,
  //   data: param,
  // }).then(res => res.data)
  return request.post('/user/add',param )
}