<template>
  <ion-page>
    <div class="min-h-screen py-6">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto">
        <div class="relative px-4 sm:rounded-3xl sm:p-20">
          <div class="max-w-md mx-auto">
            <div>
              <h1 class="text-2xl font-semibold text-center">
                تسجيل حساب جديد
              </h1>
            </div>
            <div class="">
              <div
                class="
                  py-8
                  text-base
                  leading-6
                  space-y-4
                  text-gray-700
                  sm:text-lg sm:leading-7
                "
              >
                <div class="floating-input mb-5 relative">
                  <input
                    type="email"
                    id="name"
                    v-model="email"
                    class="
                      border border-gray-200
                      focus:outline-none
                      rounded-md
                      focus:border-gray-500 focus:shadow-sm
                      w-full
                      p-3
                      h-16
                    "
                    placeholder=" "
                    autocomplete="off"
                  />
                  <label
                    for="email"
                    class="
                      absolute
                      top-0
                      right-0
                      px-3
                      py-5
                      h-full
                      pointer-events-none
                      transform
                      origin-left
                      transition-all
                      duration-100
                      ease-in-out
                    "
                    >الايميل</label
                  >
                </div>
                <div class="floating-input mb-5 relative">
                  <input
                    type="text"
                    id="name"
                    v-model="userName"
                    class="
                      border border-gray-200
                      focus:outline-none
                      rounded-md
                      focus:border-gray-500 focus:shadow-sm
                      w-full
                      p-3
                      h-16
                    "
                    placeholder=" "
                    autocomplete="off"
                  />
                  <label
                    for="email"
                    class="
                      absolute
                      top-0
                      right-0
                      px-3
                      py-5
                      h-full
                      pointer-events-none
                      transform
                      origin-left
                      transition-all
                      duration-100
                      ease-in-out
                    "
                    >الاسم </label
                  >
                </div>
                <div class="floating-input mb-5 relative">
                  <input
                    type="password"
                    v-model="password"
                    id="name"
                    class="
                      border border-gray-200
                      focus:outline-none
                      rounded-md
                      focus:border-gray-500 focus:shadow-sm
                      w-full
                      p-3
                      h-16
                    "
                    placeholder=" "
                    autocomplete="off"
                  />
                  <label
                    for="email"
                    class="
                      absolute
                      top-0
                      right-0
                      px-3
                      py-5
                      h-full
                      pointer-events-none
                      transform
                      origin-left
                      transition-all
                      duration-100
                      ease-in-out
                    "
                    >كلمه السر</label
                  >
                </div>
                <div class="relative">
                  <button
                    @click="login()"
                  v-if="regLoad"

                    class="bg-violet-600 w-full p-2 text-white rounded text-xl"
                  >
                    تسجيل حساب جديد
                  </button>
                       <button
                  v-if="!regLoad"
                    class="bg-violet-400 w-full py-2 text-white rounded text-xl flex justify-center  items-center"
                  >
                  
                    <span class="ml-8">
                        جاري تسجيل حساب جديد
                    </span>
<span class="loader -mt-3"></span>
                  </button>
                  <p class="text-center py-2">
                    لديك حساب بالفعل ؟
                    <router-link to="/LoginPage"> تسجيل الدخول </router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ion-page>
</template>

<script>
import { IonPage, alertController } from "@ionic/vue";

import axios from "axios";
export default {
  components: { IonPage },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      city: "",
      address: "",
      tel: "",
      role: "user",
      regLoad : true
    };
  },


  methods: {
    async login() {
      this.regLoad = false;
      const log = {
        userName: this.userName,
        email: this.email,
        password: this.password,

        role: "user",
      };
      if (
        this.userName == "" &&
        this.email == "" &&
        this.password == "" 

      ) {
        this.failed();
      this.regLoad = true;
        
      }else{
             try {
            const res = await axios.post(
              "http://localhost:3000/api/auth/register",
              log
            );
            console.log(res.data);
            if (res.data.success) {
                this.userName = "" 
        this.email = "" 
        this.password = "" 

                      this.$store.state.reg = true;
      this.regLoad = true;
              this.$router.push("/LoginPage");


            }
          } catch (error) {
          this.wrong("  حدث خطاء ما الرجاء التحقق من الاتصال بالانترنت");
      this.regLoad = true;

          
          

         
        }
      }

      // perform async actions
    },
    async failed() {
      const alert = await alertController.create({
        cssClass: "success-alert",
        message:
          ' <div class="flex flex-col justify-center items-center text-center"><div class="f-modal-icon f-modal-error animate"><span class="f-modal-x-mark"> <span class="f-modal-line f-modal-left animateXLeft"></span><span class="f-modal-line f-modal-right animateXRight"></span> </span><div class="f-modal-placeholder"></div><div class="f-modal-fix"></div></div><h2 class="font-semibold"> الرجاء ملء كل الحقول   </h2></div>',
        buttons: ["تم"],
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      console.log(role);
    },
    async wrong(msg) {
      const alert = await alertController.create({
        cssClass: "success-alert",
        message:
          ' <div class="flex flex-col justify-center items-center text-center"><div class="f-modal-icon f-modal-error animate"><span class="f-modal-x-mark"> <span class="f-modal-line f-modal-left animateXLeft"></span><span class="f-modal-line f-modal-right animateXRight"></span> </span><div class="f-modal-placeholder"></div><div class="f-modal-fix"></div></div><h2 class="font-semibold">' +
          msg +
          "</h2></div>",
        buttons: ["تم"],
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      console.log(role);
    },
  },
};
</script>

<style>
</style>