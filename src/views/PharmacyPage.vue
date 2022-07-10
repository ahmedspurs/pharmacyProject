<template>
  <ion-page>
    <ion-header>
      <div class="flex items-cnter justify-between px-4">
        <h2>الصيدليات</h2>
    <div class="flex items-center">
          <div class="p-3 relative">
                       <router-link to="/tabs/CartPage">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-black"
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
                       </router-link>
          </div>
          
        </div>
      </div>
    </ion-header>
    <ion-content>
      <div class="grid grid-cols-2 gap-4 p-4" >
        <div class="card" :key="item" v-for="item in 6">
             <router-link to="/tabs/ProductsPage">
             <ion-card class="shadow-none w-full">
            <img
              src="https://medomand.com/wp-content/uploads/2021/05/Medomand-online-Pharmacy-supply-1024x759.png"
              alt=""
              height="100"
              class="rounded-xl h-56 w-full"
            />

            <ion-card-content>
              <ion-text class="text-center">
                <h2 class="font-semibold text-xl"> صيديليه سييدا  </h2>
              </ion-text>
            </ion-card-content>
          </ion-card>
        </router-link>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonCard,IonCardContent,IonText } from "@ionic/vue";

import { ref } from "vue";

export default {
  name: "CategoryPage",
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonCard,IonCardContent,IonText
  },
  setup() {
    const accordionGroup = ref();
    return {
      accordionGroup,
    };
  },
};
</script>

<style>
</style>