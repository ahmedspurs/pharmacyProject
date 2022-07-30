import axios from "axios";

const state = {
  products: [],
  cart: [],
  empty:true,
  session_url: "http://localhost:3000/api/products",
};

const getters = {
  allProducts: (state) => {
    return state.products;
  },
  // all item in the cart
  allCart: (state) => {
    return state.cart;
  },
  // cart total price
  totalPrice(state) {
    let init = 0;
    state.cart.forEach((item) => {
      init += parseFloat(item.price) * parseFloat(item.price);
    });
    return init;
  },
  // cart empty
  cartEmpty(state){
    if(state.cart.length == 0){
      state.empty = true
    }
    else{
      state.empty = false
    }
    return state.empty
  }
};

const actions = {
  async fetchProducts({ commit, state }) {
 
    const response = await axios.get(state.session_url);
    commit("setProducts", response.data);
  },


  // add to cart method
  addToCart(context, item) {
    context.commit("addItem", item);
  },
};

const mutations = {
  setProducts: (state, products) => {
    state.products = products;
  },

  // add item to the cart
  addItem(state, item) {
    let found = false;
    state.cart.forEach((product) => {
      if (product.id == item.id) {
        found = !found;
      product.qty++

      } 
    });
    if (!found) {
      state.cart.push(item);
    }
   
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
