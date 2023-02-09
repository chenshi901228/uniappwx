import Request from "luch-request"
import baseConfig from "@/config/index.js"

const http = new Request()

const BASE_API = baseConfig.baseUrl
http.setConfig(config => {
	config.baseURL = BASE_API //设置请求的base url
	config.timeout = 300000 //超时时长5分钟,
	config.header = {
		...config.header,
	    'Content-Type': 'multipart/form-data;application/json;charset=UTF-8;'
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
        config.header={
            "Authorization":'Bearer ' + token
        }
    }

    if (config.method === 'POST') {
        config.data = JSON.stringify(config.data);
    }
    return config
}, error => {
    return Promise.resolve(error)
})

// 响应拦截器
http.interceptors.response.use((response) => {
    console.log(response)
    return response
}, (error) => {
    //未登录时清空缓存跳转
    if (error.statusCode == 401) {
        uni.clearStorageSync();
        uni.switchTab({
            url: "/pages/index/index.vue"
        })
    }
    return Promise.resolve(error)
})
export default http;