import axios from "axios";

const state = {
  categories: [],
  session_url: "http://localhost:3000/api/pharmacies",
  addError: [],
  config: {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_token"),
    },
  },
};

const getters = {
  allPharmacies: (state) => {
    return state.categories;
  },
};

const actions = {
  async fetchCategories({ commit, state }) {
    const response = await axios.get(state.session_url);
    commit("setCategories", response.data);
  },
  async addCategory({ commit, state }, category) {
    try {
      const response = await axios.post(
        state.session_url,
        category,
        state.config
      );
      if (response.data.success) {
        commit("newCategory", response.data);
      } else {
        state.addError.push(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  },
  async updateCategory({ commit, state }, payload) {
    const { id, category } = payload;
    console.log(id);
    await axios.put(`${state.session_url}/${id}`, category, state.config);
    commit("editCategory");
  },
  async deleteCategory({ commit, state }, id) {
    await axios.delete(`${state.session_url}/${id}`, state.config);
    commit("removeCategory", id);
  },
};

const mutations = {
  setCategories: (state, categories) => {
    state.categories = categories;
  },
  newCategory: (state, category) => {
    state.categories.unshift(category);
  },
  removeCategory: (state, id) => {
    let index = null;
    state.categories.forEach((element) => {
      if (element.id == id) {
        index = state.categories.indexOf(element);
        if (index > -1) {
          state.categories.splice(index, 1);
        }
      }
    });
  },
  editCategory: (state) => {
    console.log(state.categories);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
