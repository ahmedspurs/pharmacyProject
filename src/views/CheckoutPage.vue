<template>
  <ion-page>
    <ion-header>
      <div class="flex items-center justify-between px-4 py-2">
        <div class="p-4">
          <router-link to="/tabs/CartPage">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </router-link>
        </div>
        <h2>اتمام الطلب</h2>
        <div class="flex items-center">
          <div class="p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </ion-header>
    <ion-content>
      <!-- inputs -->

      <div class="contact">
        <ion-card class="shadow-none">
          <ion-card-content>
            <form class="w-full">
              <div class="floating-input mb-5 relative">
                <textarea
                  type="tel"
                  id="email"
                  v-model="address"
                  class="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16"
                  placeholder=" "
                  autocomplete="off"
                >
                </textarea>
                <label
                  for="email"
                  class="absolute top-0 right-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
                  >العنوان بالكامل</label
                >
              </div>

              <div class="floating-input mb-5 relative">
                <input
                  type="tel"
                  id="phone"
                  v-model="phone"
                  class="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16"
                  placeholder=" "
                  autocomplete="off"
                />
                <label
                  for="phone"
                  class="absolute top-0 right-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out"
                  >رقم الهاتف</label
                >
              </div>
            </form>
          </ion-card-content>
        </ion-card>
      </div>
      <!-- total price section -->
      <div class="total-price">
        <ion-card>
          <ion-card-content>
            <div class="products flex justify-between">
              <ion-text color="dark">
                <b>ملخص الطبيه</b>
              </ion-text>
              <ion-text color="dark">
                <b>3 ادويه</b>
              </ion-text>
            </div>
            <div class="products flex justify-between">
              <ion-text color="dark">
                <span>رسوم التوصيل</span>
              </ion-text>
              <ion-text color="dark">
                <span>50 ج.س</span>
              </ion-text>
            </div>
            <div class="products flex justify-between">
              <ion-text color="dark">
                <span>المجموع الكلي</span>
              </ion-text>
              <ion-text color="dark">
                <span>{{ totalPrice + 50 }}</span>
              </ion-text>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- checkout section -->
      <div class="checkout p-2">
        <ion-button expand="full" @click="checkout()">اتمام الطلب</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonText,
} from "@ionic/vue";

export default {
  name: "CheckoutPage",
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonText,
  },
  data() {
    return {
      address: "",
      phone: "",
    };
  },
  computed: mapGetters(["totalPrice"]),
  methods: {
    async checkout() {
      const cart = this.$store.state.products.cart;
      const data = {
        userId: this.$store.state.user.id,
        address: this.address,
        phone: this.phone,
        cart,
      };
      try {
        const response = await axios.post(
          "http://localhost:3000/api/orders",
          data
        );
        if (response.data.success) {
          console.log("success");
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log(err);
      }
    },
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
};
</script>

<style scoped>
.floating-input > input::placeholder,
.floating-input > textarea::placeholder {
  color: transparent;
}

.floating-input > input:focus,
.floating-input > textarea:focus,
.floating-input > input:not(:placeholder-shown) {
  @apply pt-8;
}

.floating-input > input:focus ~ label,
.floating-input > textarea:focus ~ label,
.floating-input > input:not(:placeholder-shown) ~ label {
  @apply opacity-75 scale-75 -translate-y-3 translate-x-1;
}
</style>
