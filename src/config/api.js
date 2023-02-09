import http from "@/utils/http.js"


export default {
	say: (data) => {
		return http.get("/anchor/shopPage")
	},
	login: data => {
		return http.post("/sys/login", data)
	}
}
