import { createStore } from "vuex";
import categories from "./categories";
import products from "./products";
import users from "./users";
import orders from "./orders";

export default createStore({
  state: {
    foundedDrugs: [],
    user: {},
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    categories,
    products,
    users,
    orders,
  },
});
