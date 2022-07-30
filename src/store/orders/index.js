import axios from "axios";

const state = {
  orders: [],
  session_url: "/api/v1/orders",
  config: {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_token"),
    },
  },
};

const getters = {
  allOrders: (state) => {
    return state.orders;
  },
};

const actions = {
  async fetchOrders({ commit, state }) {
    const response = await axios.get(state.session_url, state.config);
    commit("setOrders", response.data);
  },
  async updateOrder({ commit, state }, payload) {
    const { id, order } = payload;
    await axios.put(`${state.session_url}/${id}`, order, state.config);
    commit("editOrder");
  },
  async deleteOrder({ commit, state }, id) {
    await axios.delete(`${state.session_url}/${id}`, state.config);
    commit("removeOrder");
  },
};

const mutations = {
  setOrders: (state, orders) => {
    state.orders = orders;
  },
  removeOrder: (state) => {
    console.log(state.orders);
  },
  editOrder: (state) => {
    console.log(state.orders);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
