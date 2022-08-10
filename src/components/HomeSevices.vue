<template>
  <!-- categoris section -->
  <div class="flex px-4 justify-between items-center">
    <ion-text>
      <h1 class="font-semibold">الصيدليات</h1>
    </ion-text>
    <ion-text class="flex items-center">
      <router-link to="/tabs/PharmacyPage">
        <h3 class="text-sm mt-8">عرض الكل</h3>
      </router-link>
    </ion-text>
  </div>
  <ion-slides class="cats" :options="{ slidesPerView: 2.5 }">
    <ion-slide class="px-2" :key="item" v-for="item in allPharmacies">
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
              <span class="font-semibold">
                {{ item.name }}
              </span>
            </ion-text>
          </ion-card-content>
        </ion-card>
      </router-link>
    </ion-slide>
  </ion-slides>
</template>

<script>
import {
  IonSlide,
  IonSlides,
  IonCard,
  IonCardContent,
  IonText,
} from "@ionic/vue";
import { mapGetters } from "vuex";
export default {
  components: {
    IonSlide,
    IonSlides,
    IonCard,
    IonCardContent,
    IonText,
  },
  computed: mapGetters(["allPharmacies", "allProducts"]),
};
</script>

<style></style>
