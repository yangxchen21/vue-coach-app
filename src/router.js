import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
import CoachesList from "./pages/coaches/CoachesList";
//import CoachesDetail from "./pages/coaches/CoachesDetail";
//import CoachesRegister from "./pages/coaches/CoachRegister";
//import ContactCoach from "./pages/requests/ContactCoach";
//import RequestsReceived from "./pages/requests/RequestsReceived";
import NotFound from "./pages/NotFound";
//import UserAuth from "./pages/auth/UserAuth";
import store from "./store";

const CoachesDetail = defineAsyncComponent(() =>
  import("./pages/coaches/CoachesDetail")
);
const CoachesRegister = defineAsyncComponent(() =>
  import("./pages/coaches/CoachRegister")
);
const ContactCoach = defineAsyncComponent(() =>
  import("./pages/requests/ContactCoach")
);
const RequestsReceived = defineAsyncComponent(() =>
  import("./pages/requests/RequestsReceived")
);
const UserAuth = defineAsyncComponent(() => import("./pages/auth/UserAuth"));

const routes = [
  { path: "/", redirect: "/coaches" },
  { path: "/coaches", component: CoachesList },
  {
    path: "/coaches/:id",
    component: CoachesDetail,
    props: true,
    children: [{ path: "contact", component: ContactCoach }],
  },
  {
    path: "/register",
    component: CoachesRegister,
    meta: { requiresAuth: true },
  },
  {
    path: "/requests",
    component: RequestsReceived,
    meta: { requiresAuth: true },
  },
  { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});
export default router;
