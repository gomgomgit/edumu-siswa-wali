import axios from 'axios'
import { useToast } from 'vue-toast-notification';
import store from '../store';

const request = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
})

const userId = store.getters.currentUser.user_id

request.interceptors.request.use((config) => {
	config.params = config.params || {};
	config.params['id'] = userId ?? 0;
	return config;
});

request.interceptors.response.use(
	function (response)  {
		if (response.data?.status === false || response.data?.success === false) {
			useToast().error(response.data.message)
			throw response
		}
		return response
	},
	function (error) {
		useToast().error(error.message)

		if (error.response) {
			console.log(error.response)
			throw error.response
		} else {
			console.log(error)
			throw error
		}
	}
);

export default request