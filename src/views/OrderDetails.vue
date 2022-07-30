<template>
  <ion-page>
    <ion-header>
      <div class="flex items-cnter justify-between px-4 py-2">
        <div class="p-4">
          <router-link to="/tabs/HomePage">
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
        <h2>تفاصيل الطلب</h2>
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
      <div class="flex flex-col items-center justify-center">
        <!-- <h2>نجاح</h2> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-20 w-20 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2>تم استلام طلبك بنجاح</h2>
      </div>

      <div class="text">
        <p class="text-center">عند استلام طلبك يمكن متابعته عبر صفحه الخريطه</p>
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
                <b>3 منتجات</b>
              </ion-text>
            </div>
            <div class="products flex justify-between">
              <ion-text color="dark">
                <span>رسوم التوصيل</span>
              </ion-text>
              <ion-text color="dark">
                <span>50$</span>
              </ion-text>
            </div>
            <div class="products flex justify-between">
              <ion-text color="dark">
                <span>المجموع الكلي</span>
              </ion-text>
              <ion-text color="dark">
                <span>550.99$</span>
              </ion-text>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- continue shopping -->
      <div class="checkout p-2 absolute bottom-0 w-full">
        <router-link to="/tabs/MApPage">
          <ion-button expand="full"> متابعه الطلب </ion-button>
        </router-link>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonCard,
  IonCardContent,
  IonText,
  IonButton,
} from "@ionic/vue";

export default {
  name: "OrderDetails",
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonCard,
    IonCardContent,
    IonText,
    IonButton,
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

<style>
</style>