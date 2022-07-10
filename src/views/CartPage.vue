<template>
  <ion-page>
    <ion-header>
      <div class="flex items-cnter justify-between px-4">
        <h2>سله التسوق</h2>

      </div>
    </ion-header>
    <ion-content>
        <div class="cart">
            <div class="flex justify-between items-center p-4" :key="item" v-for="item in 4">
                <div class="w-3/4">
                    <img class="w-24 h-24" src="https://medicaldialogues.in/h-upload/2021/03/03/149310-medicine-10.webp" alt="">
                </div>
                <div class="w-full">
                    <h2 class="block"> حبوب صداع</h2>
                    <span class="text-blue-500 font-semibold block text-xl pb-2">125.99$</span>
                    <div class="flex">
                        <button class="bg-gray-300 text-black rounded p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
</svg>
                        </button>
                        <input class="w-8 text-center" type="text" value="1">
                        <button class="bg-gray-300 text-black rounded p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
</svg>
                        </button>
                    </div>
                </div>
            </div>          
        </div>

   

        <!-- checkout section -->
        <div class="checkout p-2">
          <router-link to="/tabs/CheckoutPage/">
            <ion-button expand="full">اتمام الطلب</ion-button>
          </router-link>
        </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage , IonHeader , IonContent ,  IonButton,} from "@ionic/vue"
export default {
  name: "CartPage",
  components :{
    IonPage, IonHeader , IonContent  , IonButton,
  }
};
</script>

<style>
</style>