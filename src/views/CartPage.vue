<template>
  <ion-page>
    <!--
       welcome to cart page
       this page have 3 methods : 
       1- min and max methods for control the quantaty of product in cart
       2- rem methos for remove product from cart
     -->
    <ion-header>
      <div class="flex items-center justify-between px-4">
        <h2>سله الشراء</h2>
        <div class="flex items-center"></div>
      </div>
    </ion-header>
    <ion-content>
      <div class="cartPage h-full">
        <div
          v-if="cartEmpty"
          class="flex flex-col justify-center items-center h-full"
        >
          <ion-text>
            <p>عفوا السله فارغه الرحاء اضافه بعض المنتجات اولا</p>
          </ion-text>
          <router-link to="/tabs/PharmacyPage">
            <button class="p-4 rounded bg-blue-500 text-white my-2">
              الذهاب الي المتجر
            </button>
          </router-link>
        </div>
        <div class="cart h-3/4 oveflow-scroll" v-if="!cartEmpty">
          <div
            class="flex justify-between items-center p-4"
            :key="item"
            v-for="(item, index) in $store.state.products.cart"
          >
            <div class="w-3/4">
              <img
                class="w-24 h-24"
                :src="'http://localhost:3000/uploads/' + item.image"
                alt=""
              />
            </div>
            <div class="w-full">
              <h2 class="block">{{ item.name }}</h2>
              <div class="flex justify-between">
                <span> سعر المنتج </span>
                <span class="text-violet-500 font-semibold block text-xl pb-2"
                  >{{ item.price }}$</span
                >
              </div>

              <div class="flex justify-between">
                <span> السعر الكلي </span>
                <span class="text-violet-500 font-semibold block text-xl pb-2"
                  >{{ item.price * item.qty }}$</span
                >
              </div>

              <div class="flex items-center justify-between px-2">
                <div class="flex">
                  <button
                    class="bg-gray-300 text-black rounded-full p-1"
                    @click="add(item)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                  <input
                    class="w-8 text-center"
                    type="number"
                    disabled
                    min="1"
                    v-model="item.qty"
                  />
                  <button
                    class="bg-gray-300 text-black rounded-full p-1"
                    @click="min(item)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                </div>

                <!-- delete icon-->

                <svg
                  @click="rem(index)"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- checkout section -->
          <div class="checkout p-2 w-full">
            <router-link to="/tabs/CheckoutPage/">
              <ion-button expand="full">اتمام الطلب</ion-button>
            </router-link>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonContent, IonButton, IonText } from "@ionic/vue";
import { mapGetters } from "vuex";

export default {
  name: "CartPage",
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonButton,
    IonText,
  },
  data() {
    return {
      empty: true,
    };
  },
  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
      opacity: 1,
    });

    // simulate AJAX
    setTimeout(() => {
      loader.hide();
    }, 2000);
  },

  computed: mapGetters(["cartEmpty"]),
  methods: {
    add(item) {
      item.qty++;
    },
    min(item) {
      if (item.qty == 1) {
        console.log("equal 1");
      } else {
        item.qty--;
      }
    },
    rem(index) {
      this.$store.state.products.cart.splice(index, 1);
    },
  },
};
</script>

<style></style>
