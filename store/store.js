import vue   from "vue"
import Vuex  from "vuex"
import cart from "./cart.js"
import user from "./user.js"
vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		 cart:cart,
		 user,
	}
})
export  default  store