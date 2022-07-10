<template>
  <ion-page class="">
      <ion-header >
      <div class="flex items-center justify-between px-4">
        <div class="flex items">
 <div class="p-3">
                       <router-link to="/tabs/SearchPage">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>
                
              </router-link>
          </div>
        </div>
       
        <h2> Pharmacy</h2>
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
        <ion-slide class="px-2" :key="item" v-for="item in 5">
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
                <span class="font-semibold"> صيديليه سييدا  </span>
              </ion-text>
            </ion-card-content>
          </ion-card>
        </router-link>
         
        </ion-slide>

      </ion-slides>

      <!-- leatest medicine -->
      <div class="flex px-4 justify-between items-center">
        <ion-text>
          <h1 class="font-semibold">احدث الادويه</h1>
        </ion-text>
      </div>
      <ion-slides class="p-2 leatest" :options="{ slidesPerView: 1.5 }">
        <ion-slide class="p-2" :key="item" v-for="item in 5">
          
          <div class="border border-gray-300 rounded-xl  relative">
             <router-link to="/tabs/ProducPage">
            <img
              class=""
              src="https://medicaldialogues.in/h-upload/2021/03/03/149310-medicine-10.webp"
              alt=""
            />
        </router-link>
            
            <div class="text-right p-4">
              <span class="block font-semibold">حبوب صداع </span>
              <span class="block"> صيديليه سييدا</span>
              <span class="text-blue-500 font-semibold block pt-2">150$</span>
            </div>

          
          </div>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage ,IonHeader, IonContent ,IonSlide ,IonSlides , IonCard,IonCardContent,IonText} from "@ionic/vue"

export default {
  name: "HomePage",
  components:{
  IonPage,IonHeader, IonContent ,IonSlide ,IonSlides , IonCard,IonCardContent,IonText
}
};
</script>

<style>
</style>