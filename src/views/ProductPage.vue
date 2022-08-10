<template>
  <ion-page>
    <ion-content v-if="show">
      <div class="img z-10 relative">
        <img
          class="w-full h-1/2 rounded-b-2xl"
          src="https://medicaldialogues.in/h-upload/2021/03/03/149310-medicine-10.webp"
          alt=""
        />
        <div @click="$router.go(-1)">
          <button class="bg-white rounded-xl p-4 absolute top-3 right-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-gray-500"
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
          </button>
        </div>

        <router-link to="/tabs/CartPage">
          <button class="bg-white rounded-xl p-4 absolute top-3 left-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-gray-500"
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
          </button>
        </router-link>
      </div>
      <div class="bg-white -mt-6">
        <div class="flex justify-between items-center p-4 w-full">
          <div>
            <h2>{{ product[0].name }}</h2>
            <span class="block"> {{ pharmacyName }}</span>
          </div>
          <h2>{{ product[0].price }}$</h2>
        </div>

        <div class="checkout flex justify-between items-center px-4">
          <button
            @click="addToCart(product[0])"
            class="w-3/4 text-white bg-blue-600 rounded-xl p-4"
          >
            شراء الان
          </button>
          <button
            class="border border-gray-600 text-blue-600 mx-auto p-4 rounded-xl"
          >
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
          </button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue";
import { mapGetters } from "vuex";
export default {
  name: "ProducPage",
  components: {
    IonPage,
    IonContent,
  },
  data() {
    return {
      product: [],
      pharmacy: [],
      pharmacyName: "",
      show: false,
    };
  },
  computed: mapGetters(["allPharmacies", "allProducts"]),
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
      this.show = true;
    }, 2000);
    this.product = this.allProducts.filter(
      (item) => item.id == this.$route.params.id
    );

    this.pharmacy = this.allPharmacies.filter(
      (item) => item.id == this.product[0].pharmacyId
    );
    this.pharmacyName = this.pharmacy[0].name;
    console.log(this.pharmacy);
  },
  methods: {
    addToCart(product) {
      this.cart = {
        productId: product.id,
        productName: product.name,
        pharmacyId: product.pharmacyId,
        price: product.price,
        image: product.image,
        qty: 1,
      };
      this.$store.dispatch("addToCart", this.cart);

      console.log(this.$store.state.products.cart);
    },
  },
};
</script>

<style></style>
