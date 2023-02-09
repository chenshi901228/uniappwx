import http from "@/utils/http.js"


export default {
	say: (data) => {
		return http.post("/say")
	}
}
