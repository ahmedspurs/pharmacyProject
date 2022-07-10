<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar class="bg-blue-50">
        <!-- home page tab -->
        <ion-tab-button tab="HomePage" href="/tabs/HomePage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </ion-tab-button>
        <!-- Pharmacy tab -->
        <ion-tab-button tab="PharmacyPage" href="/tabs/PharmacyPage">
          <svg
            class="h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enable-background="new 0 0 100 100"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  fill="#000000"
                  d="M68.712,44.615h-6.161v-6.164c0-1.68-1.362-3.042-3.041-3.042l-9.346-0.001    c-0.809,0-1.582,0.321-2.153,0.891c-0.571,0.571-0.892,1.345-0.892,2.153v6.164h-6.163c-1.682,0-3.044,1.362-3.044,3.044v9.346    c0,1.679,1.362,3.041,3.044,3.041h6.163v6.164c0,1.682,1.362,3.044,3.044,3.044h9.345c1.681,0,3.043-1.362,3.043-3.044v-6.164    h6.161c1.682,0,3.044-1.362,3.044-3.044v-9.343C71.756,45.978,70.393,44.615,68.712,44.615z M68.712,57.002l-9.204,0.003v9.205    h-9.345v-9.205h-9.207v-9.346h9.207v-9.208h9.345v9.208h9.204V57.002z"
                />
                <path
                  fill="#000000"
                  d="M95.465,21.862H44.838c-0.782-6.144-4.704-9.743-10.835-9.743H4.536c-1.4,0-2.536,1.135-2.536,2.536    v65.864c0,4.061,3.303,7.362,7.365,7.362c0.004,0,0.01,0,0.015,0s0.01,0,0.015,0h81.24c4.063,0,7.365-3.302,7.365-7.362v-56.12    C98,22.997,96.865,21.862,95.465,21.862z M11.687,24.399v56.12c0,1.263-1.028,2.291-2.292,2.291c-0.004,0-0.01,0.003-0.015,0.003    S9.37,82.81,9.365,82.81c-1.264,0-2.294-1.028-2.294-2.291V17.19h26.931c3.242,0,5.104,1.553,5.692,4.671H14.223    C12.822,21.862,11.687,22.997,11.687,24.399z M90.635,82.81H16.394c0.234-0.712,0.359-1.471,0.362-2.259h65.093    c0.841,0,1.522-0.683,1.522-1.523s-0.682-1.521-1.522-1.521h-65.09V26.935h76.17v50.572h-5.162c-0.839,0-1.522,0.68-1.522,1.521    s0.684,1.523,1.522,1.523h5.159C92.908,81.799,91.889,82.81,90.635,82.81z"
                />
              </g>
            </g>
          </svg>
        </ion-tab-button>
        <ion-tab-button tab="SearchPage" href="/tabs/SearchPage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </ion-tab-button>
        <!-- cart tab -->
        <ion-tab-button tab="CartPage" href="/tabs/CartPage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
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
        </ion-tab-button>
        <!-- mab tab -->
        <ion-tab-button tab="MapPage" href="/tabs/MapPage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";

export default {
  name: "TabsPage",
  components: {
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonPage,
    IonRouterOutlet,
  },
};
</script>
