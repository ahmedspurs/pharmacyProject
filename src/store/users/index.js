import axios from "axios";

const state = {
  users: [],
  session_url: "/api/v1/users",
  login_url: "/api/v1/auth/adminlogin",
  register_url: "/api/v1/auth/register",
  logout_url: "/api/v1/auth/logout",
  token: null,
  config: {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_token"),
    },
  },
};

const getters = {
  allUsers: (state) => {
    return state.users;
  },
};

const actions = {
  async login({ commit, state }, user) {
    try {
      const response = await axios.post(state.login_url, user);
      console.log("success");
      localStorage.setItem("user_token", response.data.token);
      commit("loginUser", response.data);
    } catch (err) {
      commit("loginUser", err.response.data);
    }
  },
  async register({ commit, state }, user) {
    try {
      const response = await axios.post(state.register_url, user, state.config);
      console.log("success");
      commit("registerUser", response.data);
    } catch (err) {
      commit("registerUser", err.response.data);
    }
  },
  async logout({ commit, state }) {
    try {
      const response = await axios.get(state.logout_url, state.config);
      console.log("success");
      localStorage.removeItem("user_token");
      commit("logoutUser", response.data);
    } catch (err) {
      commit("logoutUser", err.response.data);
    }
  },
  async fetchUsers({ commit, state }) {
    const response = await axios.get(state.session_url, state.config);
    commit("setUsers", response.data);
  },
  async addUser({ commit, state }, user) {
    const response = await axios.post(state.session_url, user, state.config);
    commit("newUser", response.data);
  },
  async updateUser({ commit, state }, payload) {
    const { id, user } = payload;
    console.log(user.userName);
    console.log(user.role);
    await axios.put(`${state.session_url}/${id}`, user, state.config);
    commit("editUser");
  },
  async deleteUser({ commit, state }, id) {
    await axios.delete(`${state.session_url}/${id}`, state.config);
    let index = null;
    state.users.forEach((element) => {
      if (element.id == id) {
        index = state.users.indexOf(element);
        if (index > -1) {
          state.users.splice(index, 1);
        }
      }
    });
    commit("removeUser");
  },
};

const mutations = {
  setUsers: (state, users) => {
    state.users = users;
  },
  newUser: (state, user) => {
    state.users.unshift(user);
  },
  loginUser: (state, user) => {
    if (user.success == true) {
      state.token = user.token;
    } else {
      console.log(user.success);
    }
  },
  registerUser: (state, data) => {
    if (data.success == true) {
      state.users.unshift(data.user);
    } else {
      console.log(data.success);
    }
  },
  logoutUser: (state, data) => {
    if (data.success == true) {
      state.token = null;
    } else {
      console.log(data.success);
    }
  },
  removeUser: (state) => {
    console.log(state.users);
  },
  editUser: (state) => {
    console.log(state.users);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
