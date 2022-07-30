<template>
  <ion-page>
    <ion-header>
      <div class="flex items-cnter justify-between px-4 py-2">
        <div class="p-4">
          <router-link to="/tabs/CategoryPage">
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
        <h2>نتائج البحث</h2>
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
      <div class="grid grid-cols-2 gap-4 p-4 py-8">
        <div class="card" :key="item.id" v-for="item in foundedDrugs">
          <div class="border border-gray-300 rounded-xl relative">
            <router-link :to="'/tabs/ProductPage/' + item.id">
              <img
                class=""
                src="https://medicaldialogues.in/h-upload/2021/03/03/149310-medicine-10.webp"
                alt=""
              />
            </router-link>

            <div class="text-right p-4">
              <span class="block font-semibold">{{ item.name }}</span>
              <!-- <span class="block"> {{ products[0].name }}</span> -->
              <span class="text-blue-500 font-semibold block pt-2">150$</span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 absolute top-2 right-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonContent } from "@ionic/vue";

export default {
  name: "OcrResults",
  components: {
    IonPage,
    IonHeader,
    IonContent,
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

<style></style>
