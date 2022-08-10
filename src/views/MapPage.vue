<template>
  <ion-page>
    <div class="container">
      <ion-header v-if="test">
        <ion-toolbar>
          <ion-title>متابعه الطلب</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <div class="h-3/4 flex items-center justify-center px-4">
          <p class="text-center">
            عفوا طلبك حايا قيد الانتظار , ستظهر الخريطه بمجرد البدء بتنفيذ الطلب
          </p>
        </div>
      </ion-content>
      <div id="map"></div>
    </div>
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
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
export default {
  data() {
    return {
      test: false,
      deliveryId: null,
    };
  },

  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2VlZGFtYXAiLCJhIjoiY2t4MjdmNWF6MTh6MjJvbnlmZnVjZGhocSJ9.302b3-yN28PeK2nnfpDb0g";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 16,
      projection: "globe",
    });

    map.on("style.load", () => {
      map.setFog({});
    });

    map.on("load", async () => {
      // Get the initial location of the International Space Station (ISS).
      const geojson = await getLocation();
      // Add the ISS location as a source.
      map.addSource("iss", {
        type: "geojson",
        data: geojson,
      });
      // Add the rocket symbol layer to the map.
      map.addLayer({
        id: "iss",
        type: "symbol",
        source: "iss",
        layout: {
          // This icon is a part of the Mapbox Streets style.
          // To view all images available in a Mapbox style, open
          // the style in Mapbox Studio and click the "Images" tab.
          // To add a new image to the style at runtime see
          // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
          "icon-image": "rocket-15",
        },
      });

      // Update the source from the API every 2 seconds.
      const updateSource = setInterval(async () => {
        const geojson = await getLocation(updateSource);
        map.getSource("iss").setData(geojson);
      }, 2000);

      async function getLocation(updateSource) {
        // Make a GET request to the API and return the location of the ISS.
        try {
          const response = await axios.get(
            `http://localhost:3000/api/location/${1}`
          );
          console.log(response.data);
          const { latitude, longitude } = await response.data.point;
          // Fly the map to the location.
          map.flyTo({
            center: [longitude, latitude],
            speed: 0.5,
          });
          // Return the location of the ISS as GeoJSON.
          return {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [longitude, latitude],
                },
              },
            ],
          };
        } catch (err) {
          // If the updateSource interval is defined, clear the interval to stop updating the source.
          if (updateSource) clearInterval(updateSource);
          throw new Error(err);
        }
      }
    });
  },
  components: { IonHeader, IonPage, IonContent, IonToolbar, IonTitle },
  async created() {
    const response = await axios.get("http://localhost:3000/api/orders");
    let self = this;
    console.log(response.data);
    console.log(this.$store.state.user);
    response.data.forEach((element) => {
      if (element.userId == self.$store.state.user.id) {
        self.deliveryId = element.userId;
      }
    });
    console.log(this.deliveryId);
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
.container {
  margin: 0;
  padding: 0;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
