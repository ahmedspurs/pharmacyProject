import { createRouter, createWebHistory } from "@ionic/vue-router";
import TabsPage from "../views/TabsPage.vue";
import HomePage from "../views/HomePage.vue";
import PharmacyPage from "../views/PharmacyPage.vue";
import CartPage from "../views/CartPage.vue";
import ProductsPage from "../views/ProductsPage.vue";
import ProducPage from "../views/ProducPage.vue";
import CheckoutPage from "../views/CheckoutPage.vue";
import OrderDetails from "../views/OrderDetails.vue";
import SearchPage from "../views/SearchPage.vue";
import MapPage from "../views/MapPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/tabs/HomePage"
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/HomePage"
      },
      {
        path: "HomePage",
        component: HomePage
      },
      {
        path: "PharmacyPage",
        component: PharmacyPage
      },
      {
        path: "ProductsPage",
        component: ProductsPage
      },
      {
        path: "ProducPage",
        component: ProducPage
      },
      {
        path: "CartPage",
        component: CartPage
      },
    
      {
        path: "CheckoutPage",
        component: CheckoutPage
      },
      {
        path: "OrderDetails",
        component: OrderDetails
      },
  
      {
        path: "SearchPage",
        component: SearchPage
      },
      
      {
        path: "MapPage",
        component: MapPage
      },
  

    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
