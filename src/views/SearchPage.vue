<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>البحث</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="show">
      <div class="searchBar p-2">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >بحث</label
        >
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            v-model="search"
            class="block p-4 pl-10 w-full text-left text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="بحث عن دواء"
            required
          />
          <!-- this button open modal for OCR work -->
          <button
            @click="openModal"
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        class="flex h-full justify-center items-center"
        v-show="filtered.length == 0 && search != ''"
      >
        <p>عفوا لاتوجد منتجات</p>
      </div>

      <div class="grid grid-cols-2 gap-4 p-4 py-8" v-show="search != ''">
        <div class="card" :key="item.id" v-for="item in filtered">
          <router-link :to="'/tabs/productPage/' + item.id">
            <div class="border border-gray-300 rounded-xl relative">
              <img class="w-full" src="null" alt="" />

              <div class="text-right p-4">
                <span class="block font-semibold text-black">
                  {{ item.name }}</span
                >
                <span class="block font-semibold text-black">
                  {{ item.pharmacy.name }}</span
                >
                <span class="text-violet-500 font-semibold block pt-2"
                  >{{ item.price }}$</span
                >
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonContent,
  modalController,
} from "@ionic/vue";
import OcrSearch from "@/components/OcrSearch.vue";
import { mapGetters } from "vuex";
export default {
  components: { IonPage, IonTitle, IonToolbar, IonHeader, IonContent },
  data() {
    return {
      header: "",
      products: [],
      search: "",
      filterProducts: [],
      show: false,
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
    this.$store.dispatch("fetchProducts");
    this.$store.dispatch("fetchCategories");
    // simulate AJAX
    setTimeout(() => {
      loader.hide();
      this.show = true;
    }, 2000);
  },
  computed: {
    ...mapGetters(["allPharmacies", "allProducts"]),
    filtered() {
      return this.allProducts.filter((item) => {
        return item.name.includes(this.search);
      });
    },
  },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: OcrSearch,
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === "confirm") {
        this.message = `Hello, ${data}!`;
      }
    },
  },
};
</script>

<style></style>
