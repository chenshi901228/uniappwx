import Request from "luch-request"
import baseConfig from "@/config/index.js"

const http = new Request()

const BASE_API = baseConfig.baseUrl
http.setConfig(config => {
	config.baseURL = BASE_API //设置请求的base url
	config.timeout = 300000 //超时时长5分钟,
	config.header = {
		...config.header,
	    'Content-Type': 'application/json;charset=UTF-8;'
	}
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
	return (statusCode >= 200 && statusCode < 400) || statusCode == 401;
}

//请求拦截器
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
    const token = uni.getStorageSync('token');
    if (token) {
        config.header = {
			...config.header,
            "Authorization":'Bearer ' + token
        }
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use((response) => {
	if (response.statusCode == 200) {
		if(response.data.code==500){
			if(response.data.msg){
				uni.showToast({
					title: response.data.msg,
					icon: 'none'
				})
			}else{
				uni.showToast({
					title: '未知错误',
					icon: 'none'
				})
			}
		}
		return response.data
	}else {
		
	}
    return response
}, (error) => {
    return Promise.reject(error)
})
export default http;