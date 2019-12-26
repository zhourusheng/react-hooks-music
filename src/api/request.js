import axios from 'axios'

// export const baseUrl = "http://47.105.150.105/m-api";

export const baseUrl = 'http://localhost:3000'

// axios的实例及拦截器配置
const request = axios.create({
  baseURL: baseUrl
})

request.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, '网络错误')
  }
)

export default request
