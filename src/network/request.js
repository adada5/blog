import axios from 'axios'


export function request(config){
  
    const instance = axios.create({
      baseURL:'http://127.0.0.1:2020',
      timeout:15000
    })

    instance.interceptors.request.use(config => {
      return config
    },
    err => {
      console.log(err)
    })

    instance.interceptors.response.use(res =>{
      
      return res.data
    },err =>{
      console.log(err)
      // // return err
    })

    return instance(config)  
}


