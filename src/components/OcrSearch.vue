<template>
	<!-- <div> -->
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="end">
				<ion-buttons color="medium" @click="dismiss">الغاء</ion-buttons>
			</ion-buttons>
			<ion-title slot="start">بحث عن طريق الصورة</ion-title>
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
				<ion-button
					v-if="imageUrl != ''"
					color="danger"
					class="cross"
					@click="removeImage"
					><ion-icon :icon="icons.trash"></ion-icon
				></ion-button>
				<img
					id="medicine-image"
					:src="imageUrl ? imageUrl : '/noimage.png'"
					alt="The choosen image will be displayed here ."
				/>

				<br />

				<p class="text-center py-2" id="hint">
					الرجاء ادخال صورة واضحه للوصفه الطبيه او صورة لصندوق الدواء
				</p>

				<div class="buttonsw-full">
					<button
						class="bg-blue-600 flex flex-col items-center justify-center px-4 py-8 text-white w-full rounded"
						@click="takePicture()"
					>
						<ion-icon
							class="w-8 h-8"
							:icon="icons.cameraOutline"
						></ion-icon>
						<span class="py-2 text-xl"> اختيار صورة </span>
					</button>
					<button
						class="bg-lime-600 text-white p-4 w-full rounded absolute left-0 bottom-2"
						@click="recognizeImage()"
					>
						بحث
					</button>
				</div>
			</div>

			<!-- result section -->
			<!-- <h3>Result :</h3>

				<div id="result"></div> -->
		</div>
	</ion-content>
	<!-- </div> -->
</template>

<script>
import {
	IonContent,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonButton,
	loadingController,
	IonIcon,
	IonButtons,
	modalController,
} from '@ionic/vue';
import { cameraOutline, trash } from 'ionicons/icons';
import { createWorker, OEM, PSM } from 'tesseract.js';
// import { Plugin } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export default {
	name: 'HomePage',
	data() {
		return {
			imageUrl: '',
			recognizedText: '',
			icons: {
				cameraOutline,
				trash,
			},
		};
	},
	components: {
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		IonButton,
		IonIcon,
		IonButtons,
	},
	methods: {
		async takePicture() {
			const image = await Camera.getPhoto({
				quality: 100,
				resultType: CameraResultType.Uri,
				source: CameraSource.Prompt,
				saveToGallery: false,
				webUseInput: CameraSource.Prompt,
				allowEditing: true,

				// allowEdit: true,
			});

			// image.webPath will contain a path that can be set as an image src.
			// You can access the original file using image.path, which can be
			// passed to the Filesystem API to read the raw data of the image,
			// if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
			console.log(image);
			this.imageUrl = image.webPath;
			document.querySelector('#medicine-image').src = this.imageUrl;
			// document.querySelector('#result').innerHTML = this.imageUrl;
			console.log(this.imageUrl);
		},

		async recognizeImage() {
			let loading = await loadingController.create({
				spinner: 'bubbles',
				message: 'Recognizing ... please wait a second ',
			});

			loading.present();
			const worker = createWorker({
				logger: console.log(logger),
			});
			(async () => {
				await worker.load();
				await worker.loadLanguage('eng');
				await worker.initialize('eng', OEM.DEFAULT);
				await worker.setParameters({
					tessedit_pageseg_mode: PSM.SPARSE_TEXT,
					tessedit_char_whiltelist:
						'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
					tessedit_char_blacklist: `/;][=-+_"'-__--{}:~!@#$%^&*()`,
				});

				if (this.imageUrl == '') {
					loading.dismiss();
					console.log('no image added');
				}
				const {
					data: { text },
				} = await worker.recognize(this.imageUrl);

				// for web testing
				console.log(text);

				// for mobile testing
				document.querySelector('#hint').innerHTML = '';
				document.querySelector('#hint').innerHTML = text;
				loading.dismiss();

				await worker.terminate();
			})();
		},

		removeImage() {
			this.imageUrl = '';
			document.querySelector('#medicine-image').src = 'noimage.png';
		},
		dismiss() {
			return modalController.dismiss();
		},
	},
};
</script>
