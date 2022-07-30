<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>متابعه الطلب</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="h-3/4 flex items-center">
        <p class="text-center">
          عفوا طلبك حايا قيد الانتظار , ستظهر الخريطه بمجرد البدء بتنفيذ الطلب
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonHeader,
  IonPage,
  IonContent,
  IonToolbar,
  IonTitle,
} from "@ionic/vue";
export default {
  components: { IonHeader, IonPage, IonContent, IonToolbar, IonTitle },
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