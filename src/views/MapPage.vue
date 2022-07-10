<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-title>متابعه الطلب</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content> 
        <div class="h-3/4 flex items-center">
          <p class="text-center">عفوا طلبك حايا قيد الانتظار , ستظهر الخريطه بمجرد البدء بتنفيذ الطلب</p>
        </div>
    </ion-content>

  </ion-page>
</template>

<script>
import { IonHeader , IonPage , IonContent , IonToolbar , IonTitle} from "@ionic/vue"
export default {
components : { IonHeader , IonPage , IonContent , IonToolbar , IonTitle}
}
</script>

<style>

</style>