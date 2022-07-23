import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './theme/index.css';
import './theme/style.css';

import { IonicVue } from '@ionic/vue';
import UploadImage from 'vue-upload-image';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Tesseract } from 'tesseract.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
	.use(IonicVue)
	.use(router)
	.use(VueAxios, axios)
	.use(store)
	.use(Tesseract)
	.use('upload-image', UploadImage)
	.use(defineCustomElements(window));

router.isReady().then(() => {
	app.mount('#app');
});
