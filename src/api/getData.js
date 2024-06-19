import request from '@/utils/request.js'
import axios from 'axios';


export const newUser = (param) => {
  // return axios({
  //   method: 'post',
  //   baseURL: `${baseUrl}/user/new/${param}`,
  // }).then(res => res.data)
  return request.post('/user/new', param )
}

export const addUser = (param) =>{
  // return axios({
  //   method: 'post',
  //   baseURL: `${baseUrl}/user/add`,
  //   data: param,
  // }).then(res => res.data)
  return request.post('/user/add',param )
}