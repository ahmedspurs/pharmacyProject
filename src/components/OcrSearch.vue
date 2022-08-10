<template>
  <div id="root-element">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-buttons color="medium" @click="dismiss">الغاء</ion-buttons>
        </ion-buttons>
        <ion-title>بحث عن طريق الصورة</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="h-full w-full p-4">
        <div class="h-full w-full p-4 relative">
          <!-- <input
					type="file"
					id="image-input"
					class="custom-file-input"
					accept="image/jpeg, image/png, image/jpg"
				/><br /><br /> -->
          <br />
          <div class="relatvie">
            <button
              class="bg-red-600 text-white p-2 rounded absolute top-10 right-5"
              v-if="imageUrl != ''"
              color="danger"
              @click="removeImage"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
            <!-- <ion-button
							v-if="imageUrl != ''"
							color="danger"
							class="w-8 "
							@click="removeImage"
							><ion-icon :icon="icons.trash"></ion-icon
						></ion-button> -->
            <img
              ref="myImage"
              id="medicine-image"
              class="w-full h-52"
              :src="imageUrl ? imageUrl : '/noimage.png'"
              alt="The choosen image will be displayed here ."
            />
          </div>

          <br />

          <p class="text-center py-2" id="hint">
            {{
              this.isRecognizing
                ? "جاري التحقق ..."
                : "لرجاء ادخال صورة واضحه للوصفه الطبيه او صورة لصندوق الدواء"
            }}
          </p>

          <div class="buttonsw-full" v-if="!isRecognizing">
            <button
              class="bg-blue-600 flex flex-col items-center justify-center px-4 py-4 text-white w-full rounded"
              @click="takePicture()"
            >
              <ion-icon class="w-8 h-8" :icon="icons.cameraOutline"></ion-icon>
              <span class="py-2 text-xl"> اختيار صورة </span>
            </button>
            <button
              class="bg-lime-600 text-white p-4 w-full rounded absolute left-0 bottom-2"
              @click="recognizeImage()"
            >
              بحث
            </button>
          </div>
          <circle-progress
            :percent="this.progress"
            :size="150"
            unit="'%'"
            :border-width="5"
            :border-bg-width="10"
            :show-percent="true"
            :viewport="true"
            v-else
          />
        </div>

        <!-- result section -->
        <!-- <h3>Result :</h3>

				<div id="result"></div> -->
      </div>

      <router-link to="/tabs/OcrResuls">seedasd</router-link>
    </ion-content>
  </div>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  alertController,
  IonIcon,
  IonButtons,
  modalController,
} from "@ionic/vue";
import { cameraOutline, trash } from "ionicons/icons";
import Tesseract from "tesseract.js";
// import { Plugin } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import { mapGetters } from "vuex";

export default {
  name: "HomePage",
  data() {
    return {
      imageUrl: "",
      recognizedText: "",
      progress: 0,
      isRecognizing: false,
      icons: {
        cameraOutline,
        trash,
      },
      products: [],
      drugName: "",
    };
  },
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButtons,
    CircleProgress,
  },
  computed: {
    getProgress() {
      return this.progress * 100;
    },
    ...mapGetters(["allProducts"]),
  },
  created() {
    this.products = this.allProducts;
    console.log(this.products);
  },
  methods: {
    async takePicture() {
      let image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        presentationStyle: "popover",
        correctOrientation: true,
        saveToGallery: true,
        webUseInput: true,
      });

      console.log(image);
      this.imageUrl = image.webPath;

      document.querySelector("#medicine-image").src = this.imageUrl;
    },
    async recognizeImage() {
      // if no image is added
      if (this.imageUrl == "") {
        console.log("no image added");
        let alert = await alertController.create({
          message:
            "لم يتم ادراج صورة للدواء , الرجاؤ ادراج صورة و المحاولة من جديد .",
          buttons: [
            {
              text: "حسنا",
              handler: () => {
                this.isRecognizing = false;
              },
            },
          ],
          backdropDismiss: false,
        });
        alert.present();
        return false;
      }
      this.isRecognizing = true;

      try {
        const worker = Tesseract.createWorker({
          logger: (log) => {
            if (log.status == "recognizing text") {
              this.progress = log.progress * 100;
              console.log(log.progress * 100);
            }
          },
        });
        //? for worker details :
        // *Tesseract.setLogging(true);
        (async () => {
          await worker.load();
          await worker.loadLanguage("eng");
          await worker.initialize("eng");
          await worker.setParameters({
            // tessedit_pageseg_mode: PSM.SPARSE_TEXT_OSD,
            tessedit_char_whiltelist:
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            tessedit_char_blacklist: `/;][=-+_"'-__-{}:~!@#$%^&*()`,
          });

          let data = await worker.recognize(this.imageUrl);

          if (data.data.words.length < 1 || data.data.confidence < 43) {
            let alert = await alertController.create({
              header: "أووبس .. :)",
              message:
                "لم نتمكن من قراءة نص في هذه الصورة , الرجاء التحقق و اعادة المحاولة  .",
              buttons: ["حسنا"],
            });
            alert.present();
            console.log("Cant read any text from this image .");
            document.querySelector("#hint").innerHTML = "";
            return;
          } else {
            data.data.symbols.forEach((symbol) => {
              if (symbol.text == "|") {
                symbol.text = "l";
              }
            });
            // for (let i = 0; i < data.data.words.length; i++) {
            // 	console.log(
            // 		`word number ${i + 1} : ${
            // 			data.data.words[i].text
            // 		}`
            // 	);
            // }
            data.data.words.forEach((word, index) => {
              let items = word.text.split("");
              items.forEach((char, index) => {
                if (char == "|") {
                  items[index] = "l";
                }
                console.log(char);
              });
              items.toString();
              word.text = items.join("").toString();
              console.log(word.text);
              //

              console.log(`word number ${index + 1} : ${word.text}`);
            });
            let text = data.data.text.split("");
            Array.from(text).forEach((char, index) => {
              if (char == "|") {
                text[index] = "l";
              }
            });
            let a = text.join("").toString();

            this.drugName = a;

            // for mobile testing
            document.querySelector("#hint").innerHTML = "";
            document.querySelector("#hint").innerHTML = data.data.text;
          }

          // for web testing
          console.log(data);

          // loading.dismiss();

          await worker.terminate();

          await this.searchDrug();
        })();
      } catch (error) {
        console.error(error);
      }
    },
    async searchDrug() {
      console.log(` The deteced drug is : ${this.drugName}`);

      let founded = false;
      this.products.forEach(async (product) => {
        console.log(`product name :${product.name}`);
        if (
          product.name
            .toLowerCase()
            .trim()
            .includes(this.drugName.toLowerCase().trim()) ||
          this.drugName
            .toLowerCase()
            .trim()
            .includes(product.name.toLowerCase().trim())
        ) {
          founded = true;
          if (!this.$store.state.foundedDrugs.includes(product)) {
            this.$store.state.foundedDrugs.push(product);
          }
          document.querySelector(
            "#hint"
          ).innerHTML += ` . \n ${product.name} Found in ${product.pharmacy.name}'s pharmacy . `;

          console.log(`Found in ${product.pharmacy.name}'s pharmacy . `);
        } else {
          console.log("Drug not found !.");
        }
      });

      if (!founded) {
        document.querySelector("#hint").innerHTML += `Drug not found !.`;
      }
      console.log(this.$store.state.foundedDrugs);
    },
    removeImage() {
      this.isRecognizing = false;
      this.imageUrl = "";
      this.progress = 0;
      document.querySelector("#hint").innerHTML = "";
    },
    dismiss() {
      modalController.dismiss();
    },
  },
};
</script>
<style>
#root-element {
  height: 90%;
}
/* #medicine-image {
	max-width: 300px;
	max-height: 200px;
	margin: 0;
	display: block;
	margin: auto;
} */
.vue3-circular-progressbar {
  display: block;
  margin: auto;
  margin-top: 20px;
}
.current-counter {
  font-size: 24px !important;
}
.current-counter::after {
  content: " %" !important;
}
</style>
